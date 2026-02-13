"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

type SupportedAttribute = "placeholder" | "title" | "aria-label";

const SUPPORTED_ATTRIBUTES: SupportedAttribute[] = [
  "placeholder",
  "title",
  "aria-label",
];

export default function LanguageRuntimeTranslator() {
  const { language } = useLanguage();
  const textNodeOriginalsRef = useRef(new WeakMap<Text, string>());
  const elementAttributeOriginalsRef = useRef(
    new WeakMap<Element, Map<SupportedAttribute, string>>()
  );

  useEffect(() => {
    const textNodeOriginals = textNodeOriginalsRef.current;
    const elementAttributeOriginals = elementAttributeOriginalsRef.current;

    const processTextNode = (textNode: Text) => {
      const parent = textNode.parentElement;
      if (!parent) return;
      if (parent.closest("script, style, noscript")) return;

      const originalText =
        textNodeOriginals.get(textNode) ?? textNode.nodeValue ?? "";
      if (!textNodeOriginals.has(textNode)) {
        textNodeOriginals.set(textNode, originalText);
      }

      const translated = translateText(originalText, language);
      if (textNode.nodeValue !== translated) {
        textNode.nodeValue = translated;
      }
    };

    const processElementAttributes = (element: Element) => {
      let originalMap = elementAttributeOriginals.get(element);
      if (!originalMap) {
        originalMap = new Map<SupportedAttribute, string>();
        elementAttributeOriginals.set(element, originalMap);
      }

      for (const attribute of SUPPORTED_ATTRIBUTES) {
        const currentValue = element.getAttribute(attribute);
        if (currentValue == null) continue;

        if (!originalMap.has(attribute)) {
          originalMap.set(attribute, currentValue);
        }

        const originalValue = originalMap.get(attribute) ?? currentValue;
        const translated = translateText(originalValue, language);
        if (currentValue !== translated) {
          element.setAttribute(attribute, translated);
        }
      }
    };

    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        processTextNode(node as Text);
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const element = node as Element;
      processElementAttributes(element);

      const walker = document.createTreeWalker(element, NodeFilter.SHOW_ALL);
      let current = walker.currentNode;
      while (current) {
        if (current.nodeType === Node.TEXT_NODE) {
          processTextNode(current as Text);
        } else if (current.nodeType === Node.ELEMENT_NODE) {
          processElementAttributes(current as Element);
        }
        current = walker.nextNode();
      }
    };

    processNode(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          processNode(mutation.target);
          continue;
        }

        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => processNode(node));
          continue;
        }

        if (mutation.type === "attributes") {
          processNode(mutation.target);
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: SUPPORTED_ATTRIBUTES,
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  return null;
}
