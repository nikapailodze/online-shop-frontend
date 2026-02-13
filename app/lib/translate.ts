import type { LanguageCode } from "@/app/Context/LanguageContext";

const georgianTranslations: Record<string, string> = {
  Home: "მთავარი",
  Shop: "მაღაზია",
  Blogs: "ბლოგები",
  Calculators: "კალკულატორები",
  Consultation: "კონსულტაცია",
  Profile: "პროფილი",
  "About ENDOPAIL": "ENDOPAIL-ის შესახებ",
  Welcome: "კეთილი იყოს თქვენი მობრძანება",
  "Welcome to EndoPail": "კეთილი იყოს თქვენი მობრძანება EndoPail-ზე",
  "Smart Calculators for Smarter Care": "ჭკვიანი კალკულატორები უკეთესი კლინიკური პრაქტიკისთვის",
  "Built by a passionate endocrine specialist,":
    "შექმნილია ენდოკრინოლოგიის სპეციალისტის მიერ,",
  "this site is designed to empower the endocrine community with practical tools and relatable flair.":
    "ეს საიტი ენდოკრინოლოგიურ საზოგადოებას სთავაზობს პრაქტიკულ და მარტივად გამოსაყენებელ ინსტრუმენტებს.",
  "Meet the Doctor": "გაიცანით ექიმი",
  "Schedule appointment with me": "დაჯავშნეთ კონსულტაცია ჩემთან",
  Articles: "სტატიები",
  Featured: "რჩეული",
  "Explore all blogs": "ყველა ბლოგის ნახვა",
  "Read article": "სტატიის წაკითხვა",
  "Contact Endopail": "დაუკავშირდით Endopail-ს",
  "Talk with the team": "ესაუბრეთ გუნდს",
  Email: "ელფოსტა",
  "Orders & support": "შეკვეთები და მხარდაჭერა",
  Collaborations: "თანამშრომლობა",
  "Email us": "მოგვწერეთ",
  "Browse the shop": "მაღაზიის ნახვა",
  "Clinical lead: Dr. Mariami Pailodze":
    "კლინიკური ხელმძღვანელი: დოქტორი მარიამი ფაილოძე",
  "Endocrinology Calculators": "ენდოკრინოლოგიური კალკულატორები",
  "Explore all calculators": "ყველა კალკულატორის ნახვა",
  "Open calculator": "კალკულატორის გახსნა",
  "Endocrinology Clinic": "ენდოკრინოლოგიური კლინიკა",
  "Admin Log In": "ადმინის შესვლა",
  "Site Map": "საიტის რუკა",
  "Privacy Policy": "კონფიდენციალურობის პოლიტიკა",
  "Copyright © 2026 Endopail. All rights reserved.":
    "საავტორო უფლება © 2026 Endopail. ყველა უფლება დაცულია.",
  "All Endocrinology Calculators": "ყველა ენდოკრინოლოგიური კალკულატორი",
  "Tools for assessing hormone levels, medication dosages, and other endocrine parameters.":
    "ინსტრუმენტები ჰორმონების დონის, მედიკამენტების დოზირებისა და სხვა ენდოკრინული პარამეტრების შესაფასებლად.",
  Diabetes: "დიაბეტი",
  "Fracture Risk": "მოტეხილობის რისკი",
  "Metabolic Syndrome": "მეტაბოლური სინდრომი",
  Osteoporosis: "ოსტეოპოროზი",
  "Your wardrobe called — it’s low on hormones.":
    "თქვენი გარდერობი გეძახით — ჰორმონები აკლია.",
  "Help us grow by purchasing our exclusive endocrine-themed merch. Every t-shirt you buy supports the development of more free medical tools and calculators for the endocrine community.":
    "დაგვეხმარეთ განვითარებაში ჩვენი ექსკლუზიური ენდოკრინოლოგიური მერჩის შეძენით. თითოეული შეძენილი მაისური ხელს უწყობს ენდოკრინოლოგიური საზოგადოებისთვის მეტი უფასო სამედიცინო ინსტრუმენტისა და კალკულატორის შექმნას.",
  "Questions about the calculators, merch, or partnership ideas? Reach out and we’ll get back quickly. Clinical vision by Dr. Mariami Pailodze, product and engineering by Nikolozi Pailodze.":
    "გაქვთ კითხვები კალკულატორებზე, მერჩზე ან პარტნიორობაზე? მოგვწერეთ და სწრაფად დაგიბრუნდებით. კლინიკური ხედვა: დოქტორი მარიამი ფაილოძე; პროდუქტი და ინჟინერია: ნიკოლოზი ფაილოძე.",
  "General inquiries and feedback:": "ზოგადი კითხვები და უკუკავშირი:",
  "Need help with your order or checkout? Email us and we’ll respond as soon as possible.":
    "გჭირდებათ დახმარება შეკვეთასთან ან გადახდასთან დაკავშირებით? მოგვწერეთ და რაც შეიძლება მალე გიპასუხებთ.",
  "Interested in clinical content, integrations, or co-branded drops? We’re open to partnerships that advance endocrine care.":
    "გაინტერესებთ კლინიკური კონტენტი, ინტეგრაციები ან თანაბრენდული კოლაბორაციები? ღია ვართ თანამშრომლობებისთვის, რომლებიც ენდოკრინოლოგიურ ზრუნვას ავითარებს.",
  "Your Cart is empty": "თქვენი კალათა ცარიელია",
  Subtotal: "ჯამი",
  Checkout: "გადახდა",
  "Clear Cart": "კალათის გასუფთავება",
  "Working...": "მუშავდება...",
  "Color:": "ფერი:",
  "Color:": "ფერი:",
  "Size:": "ზომა:",
  Logout: "გასვლა",
  Cancel: "გაუქმება",
  "Log out": "გასვლა",
  "Order History": "შეკვეთების ისტორია",
  "No orders yet.": "შეკვეთები ჯერ არ არის.",
  "No user data found. Please sign in.":
    "მომხმარებლის მონაცემები ვერ მოიძებნა. გთხოვთ გაიაროთ ავტორიზაცია.",
  Name: "სახელი",
  Surname: "გვარი",
  "Phone number": "ტელეფონის ნომერი",
  "ID number (optional)": "პირადი ნომერი (არასავალდებულო)",
  "Consultation reason": "კონსულტაციის მიზეზი",
  "Schedule online consultation": "ონლაინ კონსულტაციის დაჯავშნა",
  "Pick a date and time": "აირჩიეთ თარიღი და დრო",
  "Enter your details": "შეიყვანეთ თქვენი მონაცემები",
  "Review your request": "გადაამოწმეთ მოთხოვნა",
  "Choose a date": "აირჩიეთ თარიღი",
  "Available times": "ხელმისაწვდომი დროები",
  Information: "ინფორმაცია",
  Send: "გაგზავნა",
  Back: "უკან",
  Next: "შემდეგი",
  Date: "თარიღი",
  Time: "დრო",
  Reason: "მიზეზი",
  "Not selected": "არ არის არჩეული",
  "Not provided": "არ არის მითითებული",
  "Submit consultation": "კონსულტაციის გაგზავნა",
  "Scheduling...": "იგზავნება...",
  "Sign In": "შესვლა",
  "Sign Up": "რეგისტრაცია",
  "Log in": "შესვლა",
  Password: "პაროლი",
  "First Name": "სახელი",
  "Last Name": "გვარი",
  "Create an Account": "ანგარიშის შექმნა",
  "Creating Account...": "ანგარიში იქმნება...",
  "Signing In...": "მიმდინარეობს შესვლა...",
  "Already have an account?": "უკვე გაქვთ ანგარიში?",
  "Don't have an account?": "არ გაქვთ ანგარიში?",
  "I agree to the terms and policies": "ვეთანხმები წესებს და პოლიტიკას",
  "BUY NOW": "შეიძინე ახლავე",
  "Wear Your Hormones Proudly": "ატარეთ თქვენი ჰორმონები სიამაყით",
  "VANTA Coat": "VANTA პალტო",
  "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience.":
    "ექსტრემალური სითბო და სკულპტურული ფორმა ერთიანდება. დამცავი კოკონი, შექმნილი გამძლეობისთვის.",
  "Please select a date and time.": "გთხოვთ აირჩიოთ თარიღი და დრო.",
  "Please complete all required fields.":
    "გთხოვთ შეავსოთ ყველა სავალდებულო ველი.",
  "Please select a time slot.": "გთხოვთ აირჩიოთ დროის ინტერვალი.",
  "Please sign in again to schedule your consultation.":
    "კონსულტაციის დასაჯავშნად გთხოვთ თავიდან შეხვიდეთ სისტემაში.",
  "Unable to schedule consultation.": "კონსულტაციის დაჯავშნა ვერ მოხერხდა.",
  "Consultation scheduled! We will email you with the details.":
    "კონსულტაცია დაჯავშნილია! დეტალებს ელფოსტაზე მიიღებთ.",
  "Something went wrong. Please try again.":
    "დაფიქსირდა შეცდომა. სცადეთ ხელახლა.",
  "Failed to sign in": "შესვლა ვერ მოხერხდა",
  "Unable to sign in.": "სისტემაში შესვლა ვერ მოხერხდა.",
  "Signed in successfully. Redirecting...":
    "შესვლა წარმატებულია. მიმდინარეობს გადამისამართება...",
  "Failed to create account": "ანგარიშის შექმნა ვერ მოხერხდა",
  "Unable to create account.": "ანგარიშის შექმნა ვერ მოხერხდა.",
  "Account created! Redirecting to login...":
    "ანგარიში შეიქმნა! მიმდინარეობს გადასვლა შესვლის გვერდზე...",
  "Email is required": "ელფოსტა სავალდებულოა",
  "Password is required": "პაროლი სავალდებულოა",
  "First name is required": "სახელი სავალდებულოა",
  "Last name is required": "გვარი სავალდებულოა",
  "You must accept the terms and policies":
    "უნდა დაეთანხმოთ წესებს და პოლიტიკას",
  Input: "შეყვანა",
  Inputs: "შეყვანა",
  Result: "შედეგი",
  Results: "შედეგები",
  "Risk Factors": "რისკ-ფაქტორები",
  "Health Factors": "ჯანმრთელობის ფაქტორები",
  "Equations used": "გამოყენებული ფორმულები",
  "Notes & Equations used": "შენიშვნები და გამოყენებული ფორმულები",
  Precision: "სიზუსტე",
  "Low Risk": "დაბალი რისკი",
  "Moderate Risk": "საშუალო რისკი",
  "High Risk": "მაღალი რისკი",
  "Score band": "ქულის დიაპაზონი",
  "Diabetes Risk Score": "დიაბეტის რისკის ქულა",
  "Diabetes Risk Calculator": "დიაბეტის რისკის კალკულატორი",
  "Assess your diabetes risk with this screening tool":
    "შეაფასეთ დიაბეტის რისკი ამ სკრინინგ-ინსტრუმენტით",
  "Risk of Acquiring Diabetes Mellitus (7.5-year)":
    "შაქრიანი დიაბეტის განვითარების რისკი (7.5 წელი)",
  "HOMA Formula: Homeostasis Model Assessment of Insulin Resistance":
    "HOMA ფორმულა: ინსულინრეზისტენტობის ჰომეოსტაზური შეფასება",
  "Diabetes Risk Score (Type 2)": "დიაბეტის რისკის ქულა (ტიპი 2)",
  "Glycemic Assessment: A1C to Average Glucose Conversions":
    "გლიკემიური შეფასება: A1C-დან საშუალო გლუკოზის კონვერსია",
  "QUICKI Formula for Insulin Resistance":
    "QUICKI ფორმულა ინსულინრეზისტენტობისთვის",
  "Lipoprotein Insulin Resistance Index (LPIR Index)":
    "ლიპოპროტეინული ინსულინრეზისტენტობის ინდექსი (LPIR)",
  "Osteoporosis Risk Assessment Instrument (ORAI)":
    "ოსტეოპოროზის რისკის შეფასების ინსტრუმენტი (ORAI)",
  "Osteoporosis Self Assessment Tool for Adult Females (OST)":
    "ოსტეოპოროზის თვითშეფასების ინსტრუმენტი ზრდასრული ქალებისთვის (OST)",
  "Osteoporosis Self Assessment Tool for Adult Males (OST)":
    "ოსტეოპოროზის თვითშეფასების ინსტრუმენტი ზრდასრული კაცებისთვის (OST)",
  "Osteoporosis Risk SCORE (Osteoporosis Risk Estimation)":
    "ოსტეოპოროზის რისკის SCORE (რისკის შეფასება)",
  BMI: "სხეულის მასის ინდექსი",
  "BMI Points": "BMI ქულები",
  Age: "ასაკი",
  Sex: "სქესი",
  Weight: "წონა",
  Height: "სიმაღლე",
  Female: "ქალი",
  Male: "კაცი",
  "Physically active": "ფიზიკურად აქტიური",
  "History of hypertension": "ჰიპერტენზიის ანამნეზი",
  "Family history of diabetes": "დიაბეტის ოჯახური ანამნეზი",
  "Choose date": "აირჩიეთ თარიღი",
};

const dynamicGeorgianRules: Array<{
  pattern: RegExp;
  replace: (...args: string[]) => string;
}> = [
  {
    pattern: /^(\d+)\sitems in cart$/,
    replace: (count) => `კალათაში ${count} პროდუქტი`,
  },
  {
    pattern: /^Order #(\d+) placed\. Total ([\d.]+) GEL\.$/,
    replace: (orderId, total) =>
      `შეკვეთა #${orderId} გაფორმდა. ჯამური თანხა ${total} GEL.`,
  },
  {
    pattern: /^Order #(\d+)$/,
    replace: (orderId) => `შეკვეთა #${orderId}`,
  },
  {
    pattern: /^x(\d+)\s@\s([\d.]+)\sGEL$/,
    replace: (qty, price) => `${qty} ც. @ ${price} GEL`,
  },
  {
    pattern: /^(.+)\s-\s(.+)\sread$/,
    replace: (date, minutes) => `${date} - ${minutes} წასაკითხად`,
  },
];

const georgianPhraseReplacements: Record<string, string> = {
  "Calculator not found": "კალკულატორი ვერ მოიძებნა",
  "Assess your diabetes risk with this clinical screening tool":
    "შეაფასეთ დიაბეტის რისკი ამ კლინიკური სკრინინგ-ინსტრუმენტით",
  "A diabetes risk score of": "დიაბეტის რისკის ქულა",
  "indicates increased risk of pre-diabetes or undiagnosed diabetes.":
    "მიუთითებს პრედიაბეტის ან დაუდგენელი დიაბეტის გაზრდილ რისკზე.",
  "indicates increased risk of undiagnosed diabetes.":
    "მიუთითებს დაუდგენელი დიაბეტის გაზრდილ რისკზე.",
  "Select a date": "აირჩიეთ თარიღი",
  "Choose date": "აირჩიეთ თარიღი",
  "Choose a date": "აირჩიეთ თარიღი",
  "Choose time": "აირჩიეთ დრო",
  "Enter details": "შეიყვანეთ დეტალები",
  "Review & submit": "გადაამოწმეთ და გაგზავნეთ",
  "Tell us what you need and our admin will confirm the appointment via email.":
    "მოგვწერეთ რა გჭირდებათ და ჩვენი ადმინისტრატორი ელფოსტით დაგიდასტურებთ ვიზიტს.",
  "Clinical Lead": "კლინიკური ხელმძღვანელი",
  "Order #": "შეკვეთა #",
  "placed. Total": "გაფორმდა. ჯამი",
  "Unable to load products": "პროდუქტების ჩატვირთვა ვერ მოხერხდა",
  "Failed to load products.": "პროდუქტების ჩატვირთვა ვერ მოხერხდა.",
  "Unable to load orders": "შეკვეთების ჩატვირთვა ვერ მოხერხდა",
  "Failed to load orders.": "შეკვეთების ჩატვირთვა ვერ მოხერხდა.",
  "Are you sure you want to log out?": "ნამდვილად გსურთ სისტემიდან გასვლა?",
  "Schedule appointment": "კონსულტაციის დაჯავშნა",
  "Explore all": "ყველას ნახვა",
  "Open": "გახსნა",
  "read": "წასაკითხად",
  "Score": "ქულა",
  "Risk": "რისკი",
  "High": "მაღალი",
  "Moderate": "საშუალო",
  "Low": "დაბალი",
  "Result": "შედეგი",
  "Results": "შედეგები",
  "Input": "შეყვანა",
  "Age": "ასაკი",
  "Weight": "წონა",
  "Height": "სიმაღლე",
  "Sex": "სქესი",
  "Female": "ქალი",
  "Male": "კაცი",
  "Date": "თარიღი",
  "Time": "დრო",
  "Reason": "მიზეზი",
  "Email": "ელფოსტა",
  "Phone": "ტელეფონი",
  "Name": "სახელი",
  "Surname": "გვარი",
  "Color": "ფერი",
  "Size": "ზომა",
};

export function translateText(text: string, language: LanguageCode): string {
  if (language === "en") {
    return text;
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return text;
  }

  const leadingWhitespaceMatch = text.match(/^\s*/);
  const trailingWhitespaceMatch = text.match(/\s*$/);
  const leadingWhitespace = leadingWhitespaceMatch?.[0] ?? "";
  const trailingWhitespace = trailingWhitespaceMatch?.[0] ?? "";

  const directMatch = georgianTranslations[trimmed];
  if (directMatch) {
    return `${leadingWhitespace}${directMatch}${trailingWhitespace}`;
  }

  for (const rule of dynamicGeorgianRules) {
    const match = trimmed.match(rule.pattern);
    if (!match) continue;
    return `${leadingWhitespace}${rule.replace(
      ...(match.slice(1) as string[])
    )}${trailingWhitespace}`;
  }

  let translated = trimmed;
  const sortedPhrases = Object.keys(georgianPhraseReplacements).sort(
    (a, b) => b.length - a.length
  );
  for (const phrase of sortedPhrases) {
    if (!translated.includes(phrase)) continue;
    translated = translated.split(phrase).join(georgianPhraseReplacements[phrase]);
  }

  if (translated !== trimmed) {
    return `${leadingWhitespace}${translated}${trailingWhitespace}`;
  }

  return text;
}
