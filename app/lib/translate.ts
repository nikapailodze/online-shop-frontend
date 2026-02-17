import type { LanguageCode } from "@/app/Context/LanguageContext";

const georgianTranslations: Record<string, string> = {
  Home: "მთავარი",
  Shop: "მაღაზია",
  Blogs: "ბლოგები",
  Calculators: "კალკულატორები",
  Consultation: "კონსულტაცია",
  Profile: "პროფილი",
  "About ENDOPAIL": "ENDOPAIL-ის შესახებ",
  "About Endopail": "Endopail-ის შესახებ",
  "Clinical tools and commerce for endocrine care":
    "კლინიკური ინსტრუმენტები და კომერცია ენდოკრინული ზრუნვისთვის",
  "Endopail brings together evidence-based endocrine calculators and a curated shop of endocrine-inspired products to support clinicians and patients. The medical vision comes from Dr. Mariami Pailodze, with product execution and engineering by Nikolozi Pailodze.":
    "Endopail აერთიანებს მტკიცებულებაზე დაფუძნებულ ენდოკრინოლოგიურ კალკულატორებს და სპეციალურად შერჩეულ მაღაზიას ენდოკრინოლოგიური თემატიკის პროდუქტებით, კლინიცისტებისა და პაციენტების მხარდასაჭერად. სამედიცინო ხედვას აყალიბებს დოქტორი მარიამი ფაილოძე, ხოლო პროდუქტის განვითარებასა და ინჟინერიას ხელმძღვანელობს ნიკოლოზი ფაილოძე.",
  "Explore calculators": "კალკულატორების ნახვა",
  "Visit the shop": "მაღაზიის ნახვა",
  "What the app serves": "რას ემსახურება აპი",
  "Fast, clinically-focused endocrine calculators for screening, risk estimation, and treatment planning—paired with a storefront for endocrine-themed gear that funds further tool development.":
    "სწრაფი, კლინიკაზე ორიენტირებული ენდოკრინოლოგიური კალკულატორები სკრინინგისთვის, რისკის შეფასებისა და მკურნალობის დაგეგმვისთვის, ასევე ენდოკრინოლოგიური თემატიკის პროდუქციის მაღაზია, რომელიც ხელს უწყობს ახალი ინსტრუმენტების განვითარებას.",
  "For clinicians": "კლინიცისტებისთვის",
  "Point-of-care utilities to cut friction: metabolic syndrome criteria, fracture risk indices, sodium corrections, diabetes screening trees, and more—kept consistent and easy to reference during consults.":
    "პაციენტთან მუშაობისას გამოსაყენებელი ინსტრუმენტები, რომლებიც ამცირებს სირთულეს: მეტაბოლური სინდრომის კრიტერიუმები, მოტეხილობის რისკის ინდექსები, ნატრიუმის კორექცია, დიაბეტის სკრინინგის decision tree და სხვა - ყველაფერი თანმიმდევრული და კონსულტაციის დროს მარტივად გამოსაყენებელი.",
  "For patients & learners": "პაციენტებისა და შემსწავლელებისთვის",
  "Clear outputs and terminology that align with clinical guidance, plus merch that sparks conversation and supports ongoing content.":
    "გასაგები შედეგები და ტერმინოლოგია, რომელიც კლინიკურ რეკომენდაციებს შეესაბამება, ასევე მერჩი, რომელიც ინტერესს აღძრავს და კონტენტის განვითარებას მხარს უჭერს.",
  "Medical lead": "სამედიცინო ხელმძღვანელი",
  "Dr. Mariami Pailodze shapes the clinical ideas, ensuring calculators follow current endocrine evidence and real-world workflows.":
    "დოქტორი მარიამი ფაილოძე აყალიბებს კლინიკურ მიმართულებას და უზრუნველყოფს, რომ კალკულატორები შეესაბამებოდეს თანამედროვე ენდოკრინოლოგიურ მტკიცებულებებსა და რეალურ სამუშაო პროცესებს.",
  "Product & engineering": "პროდუქტი და ინჟინერია",
  "Built and maintained by Nikolozi Pailodze—architecture, UI, and integrations across the calculators, cart, checkout, and profile experience.":
    "შექმნილი და განვითარებული ნიკოლოზი ფაილოძის მიერ - არქიტექტურა, UI და ინტეგრაციები კალკულატორებში, კალათაში, გადახდასა და პროფილის ფუნქციონალში.",
  "What’s inside": "რა შედის პლატფორმაში",
  "Authenticated profiles, saved orders, secure cart/checkout, and a growing library of endocrine calculators—all under the Endopail brand.":
    "ავტორიზებული პროფილები, შენახული შეკვეთები, უსაფრთხო კალათა/გადახდა და მუდმივად მზარდი ენდოკრინოლოგიური კალკულატორების ბიბლიოთეკა - ყველაფერი Endopail-ის ბრენდის ქვეშ.",
  "Why it matters": "რატომ არის მნიშვნელოვანი",
  "Endopail is built to keep endocrine care practical: tools you can trust, a store that funds more tools, and a focused team—clinical leadership from Dr. Mariami Pailodze and development by Nikolozi Pailodze—iterating quickly for clinicians and patients alike.":
    "Endopail შექმნილია იმისთვის, რომ ენდოკრინული ზრუნვა იყოს პრაქტიკული: სანდო ინსტრუმენტები, მაღაზია, რომელიც ახალი ინსტრუმენტების შექმნას აფინანსებს, და ფოკუსირებული გუნდი - კლინიკური ხელმძღვანელობა დოქტორი მარიამი ფაილოძისგან და განვითარება ნიკოლოზი ფაილოძისგან - სწრაფი გაუმჯობესებით როგორც კლინიცისტებისთვის, ისე პაციენტებისთვის.",
  Welcome: "კეთილი იყოს თქვენი მობრძანება",
  "Welcome to EndoPail": "",
  "Smart Calculators for Smarter Care": "ჭკვიანი კალკულატორები უკეთესი კლინიკური პრაქტიკისთვის",
  "Built by a passionate endocrine specialist,":
    "შექმნილია ენდოკრინოლოგიის სპეციალისტის მიერ,",
  "this site is designed to empower the endocrine community with practical tools and relatable flair.":
    "ეს საიტი ენდოკრინოლოგიურ საზოგადოებას სთავაზობს პრაქტიკულ და მარტივად გამოსაყენებელ ინსტრუმენტებს.",
  "Meet the Doctor": "გაიცანით ექიმი",
  "Hi there! As a Medical Doctor and Endocrinology Resident at Caucasus Medical Center, I specialize in diagnosing and managing endocrine disorders while actively contributing to medical research. With expertise in drug safety, pharmacovigilance, and clinical trials, I ensure patient safety and evidence-based treatment approaches. As a Study Coordinator for a Phase III clinical trial, and member of the Endocrinology Association, I am committed to advancing healthcare through research, innovation, and multidisciplinary collaboration.":
    "გამარჯობა! როგორც ექიმი და ენდოკრინოლოგიის რეზიდენტი კავკასიის სამედიცინო ცენტრში, სპეციალიზებული ვარ ენდოკრინული დაავადებების დიაგნოსტიკასა და მართვაში და აქტიურად ვმონაწილეობ სამედიცინო კვლევებში. მედიკამენტების უსაფრთხოების, ფარმაკოვიგილანსისა და კლინიკური კვლევების გამოცდილებით, უზრუნველვყოფ პაციენტის უსაფრთხოებასა და მტკიცებულებაზე დაფუძნებულ მკურნალობის მიდგომებს. როგორც III ფაზის კლინიკური კვლევის კოორდინატორი და ენდოკრინოლოგთა ასოციაციის წევრი, ერთგული ვარ ჯანდაცვის განვითარებისადმი კვლევის, ინოვაციისა და მულტიდისციპლინური თანამშრომლობის გზით.",
  "Schedule appointment with me": "დაჯავშნეთ კონსულტაცია ჩემთან",
  Articles: "სტატიები",
  Featured: "რჩეული",
  "Explore all blogs": "ყველა ბლოგის ნახვა",
  "Read article": "სტატიის წაკითხვა",
  "Write": "დაწერა",
  "Write new article": "ახალი სტატიის დაწერა",
  "<- Back to articles": "<- სტატიებზე დაბრუნება",
  Title: "სათაური",
  "Your article title": "თქვენი სტატიის სათაური",
  Excerpt: "მოკლე აღწერა",
  "A brief summary for previews and SEO...":
    "მოკლე შეჯამება პრევიუსა და SEO-სთვის...",
  "Cover Image": "საფარის სურათი",
  Image: "სურათი",
  "Click to upload cover image": "დააჭირეთ საფარის სურათის ასატვირთად",
  "No file chosen": "ფაილი არ არის არჩეული",
  Category: "კატეგორია",
  endocrinology: "ენდოკრინოლოგია",
  "diabetes care": "დიაბეტის მოვლა",
  thyroid: "ფარისებრი ჯირკვალი",
  metabolism: "მეტაბოლიზმი",
  nutrition: "კვება",
  "clinical research": "კლინიკური კვლევა",
  "patient education": "პაციენტის განათლება",
  "Author Name": "ავტორის სახელი",
  Author: "ავტორი",
  "Reading Time (min)": "კითხვის დრო (წთ)",
  Tags: "ტეგები",
  "Add a tag and press Enter": "დაამატეთ ტეგი და დააჭირეთ Enter-ს",
  Add: "დამატება",
  "Content (Markdown)": "კონტენტი (Markdown)",
  "Write your article content in Markdown...":
    "დაწერეთ სტატიის კონტენტი Markdown ფორმატში...",
  "Mark as featured article": "მონიშნე როგორც გამორჩეული სტატია",
  "Save Draft": "შენახვა მონახაზად",
  Publish: "გამოქვეყნება",
  Drafts: "მონახაზები",
  "Drafts are saved locally on this device.":
    "მონახაზები ინახება ამ მოწყობილობაზე ლოკალურად.",
  "No drafts yet.": "მონახაზები ჯერ არ არის.",
  Draft: "მონახაზი",
  Technology: "ტექნოლოგია",
  "Stay in the loop": "იყავით ინფორმირებული",
  "Get the latest endocrine insights delivered to your inbox. No spam, just clear and practical updates.":
    "მიიღეთ ენდოკრინოლოგიის უახლესი ინფორმაცია პირდაპირ ელფოსტაზე. სპამის გარეშე, მხოლოდ მკაფიო და პრაქტიკული განახლებები.",
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
  "Search calculators...": "კალკულატორების ძიება...",
  "No calculators found": "კალკულატორები ვერ მოიძებნა",
  All: "ყველა",
  Endocrinology: "ენდოკრინოლოგია",
  "Diabetes Care": "დიაბეტის მოვლა",
  Thyroid: "ფარისებრი ჯირკვალი",
  Metabolism: "მეტაბოლიზმი",
  Nutrition: "კვება",
  "Clinical Research": "კლინიკური კვლევა",
  "Patient Education": "პაციენტის განათლება",
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
  "Metabolic Syndrome Criteria (AACE 2003)":
    "მეტაბოლური სინდრომის კრიტერიუმები (AACE 2003)",
  "Metabolic Syndrome Criteria (ATP III)":
    "მეტაბოლური სინდრომის კრიტერიუმები (ATP III)",
  "Metabolic Syndrome Criteria (IDF 2005)":
    "მეტაბოლური სინდრომის კრიტერიუმები (IDF 2005)",
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
  "USDA DRI Calculator (Adults)": "USDA DRI კალკულატორი (მოზრდილები)",
  "Estimates energy and macronutrient targets from DRI equations.":
    "აფასებს დღიურ ენერგიასა და მაკრონუტრიენტების მიზნობრივ დიაპაზონებს DRI ფორმულებით.",
  "Physical activity": "ფიზიკური აქტივობა",
  "Activity level": "აქტივობის დონე",
  Sedentary: "მჯდომარე",
  "Low active": "დაბალი აქტივობა",
  Active: "აქტიური",
  "Very active": "ძალიან აქტიური",
  "Estimated Energy Requirement (kcal/day)":
    "ენერგიის სავარაუდო მოთხოვნა (კკალ/დღე)",
  "Carbohydrate range (g/day)": "ნახშირწყლების დიაპაზონი (გ/დღე)",
  "Protein range (g/day)": "ცილების დიაპაზონი (გ/დღე)",
  "Fat range (g/day)": "ცხიმების დიაპაზონი (გ/დღე)",
  "Total water AI (L/day)": "წყლის საერთო AI (ლ/დღე)",
  "This implementation currently supports adults 19+ years.":
    "ამ ვერსიაში მხარდაჭერილია მხოლოდ 19+ წლის მოზრდილები.",
  "EER equations use sex-specific IOM/DRI adult formulas and physical activity coefficients.":
    "EER განტოლებები იყენებს IOM/DRI-ის სქეს-სპეციფიკურ მოზრდილთა ფორმულებს და ფიზიკური აქტივობის კოეფიციენტებს.",
  "Macronutrient ranges use AMDR: carbs 45-65%, protein 10-35%, fat 20-35%.":
    "მაკრონუტრიენტების დიაპაზონები ეფუძნება AMDR-ს: ნახშირწყლები 45-65%, ცილა 10-35%, ცხიმი 20-35%.",
  "Total water AI shown: women 2.7 L/day, men 3.7 L/day.":
    "წყლის საერთო AI: ქალები 2.7 ლ/დღე, კაცები 3.7 ლ/დღე.",
  "For the full USDA DRI nutrient calculator, use:":
    "USDA DRI-ის სრული ნუტრიენტული კალკულატორისთვის გამოიყენეთ:",
  "USDA DRI Calculator": "USDA DRI კალკულატორი",
  "Risk of Acquiring Diabetes Mellitus (7.5-year)":
    "შაქრიანი დიაბეტის განვითარების რისკი (7.5 წელი)",
  "FBS (fasting blood sugar)": "უზმოზე სისხლის შაქარი (FBS)",
  "HDL Cholesterol": "HDL ქოლესტერინი",
  "MA (Ethnicity)": "MA (ეთნიკურობა)",
  "Measured plasma/serum sodium": "პლაზმის/შრატის გაზომილი ნატრიუმი",
  "Serum glucose": "შრატის გლუკოზა",
  "Measured Sodium": "გაზომილი ნატრიუმი",
  "Corrected Sodium": "კორექტირებული ნატრიუმი",
  "Glucose": "გლუკოზა",
  "Glucose: Normal": "გლუკოზა: ნორმა",
  "Glucose: არაrmal": "გლუკოზა: ნორმა",
  IGT: "IGT",
  IFG: "IFG",
  "Type 2 Diabetes": "ტიპი 2 დიაბეტი",
  "Reduced insulin sensitivity": "ინსულინის მგრძნობელობის დაქვეითება",
  "Microalbuminuria present": "მიკროალბუმინურია აღინიშნება",
  Waist: "წელის გარშემოწერილობა",
  Hip: "თეძოს გარშემოწერილობა",
  Triglycerides: "ტრიგლიცერიდები",
  "Systolic BP": "სისტოლური არტერიული წნევა",
  "Less than 65 (0)": "65-ზე ნაკლები (0)",
  "65–69 (1)": "65–69 (1)",
  "70–74 (2)": "70–74 (2)",
  "75–79 (3)": "75–79 (3)",
  "80–85 (4)": "80–85 (4)",
  "85 and over (5)": "85 და მეტი (5)",
  "−1 or greater (0)": "−1 ან მეტი (0)",
  "between −1 and −2 (2)": "−1-დან −2-მდე (2)",
  "between −2 and −2.5 (3)": "−2-დან −2.5-მდე (3)",
  "less than −2.5 (4)": "−2.5-ზე ნაკლები (4)",
  "BMD T-score": "BMD T-ქულა",
  "Total criteria": "სულ კრიტერიუმები",
  "Point Count": "ქულების რაოდენობა",
  "5 Year Nonvertebral Fracture Risk":
    "5-წლიანი არავერტებერალური მოტეხილობის რისკი",
  "5 Year Hip Fracture Risk": "5-წლიანი ბარძაყის მოტეხილობის რისკი",
  "5 Year Vertebral Fracture Risk": "5-წლიანი ვერტებრალური მოტეხილობის რისკი",
  Smoker: "მწეველი",
  "UBPI (Ultrasound Bone Profile Index)":
    "UBPI (ულტრაბგერითი ძვლის პროფილის ინდექსი)",
  "On Estrogen: Yes (0 points)": "ესტროგენი: დიახ (0 ქულა)",
  "On Estrogen: No (2 points)": "ესტროგენი: არა (2 ქულა)",
  "American Indian or Alaska Native (5)":
    "ამერიკელი ინდიელი ან ალასკის მკვიდრი (5)",
  "Asian (5)": "აზიელი (5)",
  "Black or African American (0)": "შავკანიანი ან აფროამერიკელი (0)",
  "Native Hawaiian or Other Pacific Islander (5)":
    "ჰავაის მკვიდრი ან წყნარი ოკეანის სხვა კუნძულელი (5)",
  "White (5)": "თეთრკანიანი (5)",
  "Rheumatoid Arthritis: Present (4)":
    "რევმატოიდული ართრიტი: აღინიშნება (4)",
  "Rheumatoid Arthritis: Absent (0)":
    "რევმატოიდული ართრიტი: არ აღინიშნება (0)",
  "OST score": "OST ქულა",
  Cutoffs: "ზღვრები",
  "Interpretation bands": "ინტერპრეტაციის დიაპაზონები",
  "HOMA Formula: Homeostasis Model Assessment of Insulin Resistance":
    "HOMA ფორმულა: ინსულინრეზისტენტობის ჰომეოსტაზური შეფასება",
  "Diabetes Risk Score (Type 2)": "დიაბეტის რისკის ქულა (ტიპი 2)",
  "A tool that calculates the likelihood of developing type 2 diabetes based on various risk factors.":
    "ინსტრუმენტი, რომელიც სხვადასხვა რისკ-ფაქტორის მიხედვით ითვლის ტიპი 2 დიაბეტის განვითარების ალბათობას.",
  "Diabetes Type Predictor TreeCalc": "დიაბეტის ტიპის პროგნოზირების TreeCalc",
  "A tool that uses a decision tree style logic to suggest the likely diabetes type.":
    "ინსტრუმენტი, რომელიც გადაწყვეტილების ხის ლოგიკით გვთავაზობს დიაბეტის სავარაუდო ტიპს.",
  "Is patient obese?": "პაციენტი ჭარბწონიანია?",
  "Ketosis present": "კეტოზი არსებობს",
  "Initial treatment": "საწყისი მკურნალობა",
  "End Point": "დასკვნა",
  Prediction: "პროგნოზი",
  "Physician review required for individual assessment":
    "ინდივიდუალური შეფასებისთვის აუცილებელია ექიმის შეფასება",
  "Complete all inputs to generate a suggestion.":
    "რეკომენდაციის მისაღებად შეავსეთ ყველა ველი.",
  "Likely Type 1": "სავარაუდოდ ტიპი 1",
  "Likely Type 2": "სავარაუდოდ ტიპი 2",
  Indeterminate: "განუსაზღვრელი",
  "Ketosis is present, which commonly accompanies absolute insulin deficiency.":
    "არსებობს კეტოზი, რაც ხშირად ახლავს ინსულინის აბსოლუტურ დეფიციტს.",
  "Obesity without ketosis and initial management not requiring insulin suggests insulin resistance predominance.":
    "ჭარბწონიანობა კეტოზის გარეშე და საწყისი მართვა ინსულინის გარეშე უფრო მეტად მიუთითებს ინსულინრეზისტენტობაზე.",
  "The combination of features does not clearly distinguish type; clinical review and labs (e.g., C-peptide, autoantibodies) are warranted.":
    "ნიშნების კომბინაცია ტიპს მკაფიოდ ვერ განასხვავებს; საჭიროა კლინიკური შეფასება და ლაბორატორიული კვლევები (მაგ., C-პეპტიდი, ავტოანტისხეულები).",
  "Fasting Insulin": "უზმოზე ინსულინი",
  "Fasting Glucose": "უზმოზე გლუკოზა",
  "LPIR Index": "LPIR ინდექსი",
  Breakdown: "დეტალები",
  "LPIR Index ranges from 0 to 100.": "LPIR ინდექსი მერყეობს 0-დან 100-მდე.",
  "Rx HTN": "ჰიპერტენზიის მკურნალობა",
  "On HTN meds (1.222)": "იღებს ჰიპერტენზიის მედიკამენტებს (1.222)",
  "No HTN meds (0)": "არ იღებს ჰიპერტენზიის მედიკამენტებს (0)",
  "Rx Steroids": "სტეროიდების მიღება",
  "On steroids (2.191)": "იღებს სტეროიდებს (2.191)",
  "Not on steroids (0)": "არ იღებს სტეროიდებს (0)",
  FMH: "ოჯახური ანამნეზი (FMH)",
  "No 1st-degree family with DM (0)":
    "პირველი ხარისხის ნათესავში დიაბეტი არ არის (0)",
  "Parent OR sibling (0.728)": "მშობელი ან და/ძმა (0.728)",
  "Parent AND sibling (0.753)": "მშობელიც და და/ძმაც (0.753)",
  "Non-smoker (0)": "არამწეველი (0)",
  "Used to smoke (−0.218)": "ადრე ეწეოდა (−0.218)",
  "Smoker (0.855)": "მწეველი (0.855)",
  Terms: "ფორმულის შედეგი",
  "Decimal Precision": "ათწილადის სიზუსტე",
  "Diabetes Screening TreeCalc": "დიაბეტის სკრინინგის TreeCalc",
  "Identify individuals at increased risk for undiagnosed diabetes.":
    "გამოავლენს პირებს, რომლებსაც დაუდგენელი დიაბეტის გაზრდილი რისკი აქვთ.",
  "Sedentary with little or no exercise":
    "მჯდომარე ცხოვრების წესი, მცირე ან საერთოდ არანაირი ვარჯიშით",
  "Obesity (>120% IBW)": "ჭარბწონიანობა (>120% IBW)",
  Recommendation: "რეკომენდაცია",
  "Decision Points": "გადაწყვეტის კრიტერიუმები",
  "Age 65 or older:": "ასაკი 65 ან მეტი:",
  "Age 45 or older:": "ასაკი 45 ან მეტი:",
  "Screening not indicated": "სკრინინგი მითითებული არ არის",
  "Screening indicated (Age ≥65)": "სკრინინგი რეკომენდებულია (ასაკი ≥65)",
  "Screening indicated (Obesity)":
    "სკრინინგი რეკომენდებულია (ჭარბწონიანობა)",
  "Screening indicated (Age ≥45 and sedentary)":
    "სკრინინგი რეკომენდებულია (ასაკი ≥45 და მჯდომარე ცხოვრების წესი)",
  "Glycemic Assessment: A1C to Average Glucose Conversions":
    "გლიკემიური შეფასება: A1C-დან საშუალო გლუკოზის კონვერსია",
  "Estimated average glucose": "საშუალო გლუკოზის შეფასება",
  "Estimated average glucose (SI)": "საშუალო გლუკოზის შეფასება (SI)",
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
    pattern: /^[eE]\.g\.\s+(.+)$/,
    replace: (value) => `მაგ. ${value}`,
  },
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
  "cholesterol": "ქოლესტერინი",
  "read": "წასაკითხად",
  "Score": "ქულა",
  "Risk": "რისკი",
  "High": "მაღალი",
  "Moderate": "საშუალო",
  "Low": "დაბალი",
  "Obesity": "ჭარბწონიანობა",
  "obesity": "ჭარბწონიანობა",
  "sedentary": "მჯდომარე",
  "Result": "შედეგი",
  "Results": "შედეგები",
  "Total": "სულ",
  "Count": "რაოდენობა",
  "Point": "ქულა",
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
  "Important: Inputs must be complete to perform calculation.":
    "მნიშვნელოვანია: გამოსათვლელად ყველა ველი უნდა იყოს შევსებული.",
  "Decimal precision": "ათწილადის სიზუსტე",
  "Scoring": "ქულების დათვლა",
  "References": "წყაროები",
  "Criteria": "კრიტერიუმები",
  "Required Criteria": "აუცილებელი კრიტერიუმები",
  "Required Criterion": "აუცილებელი კრიტერიუმი",
  "Clinical Criteria": "კლინიკური კრიტერიუმები",
  "Other Criteria": "სხვა კრიტერიუმები",
  "Notes": "შენიშვნები",
  "Notes & Criteria": "შენიშვნები და კრიტერიუმები",
  "Notes & References": "შენიშვნები და წყაროები",
  "Equation": "ფორმულა",
  "Equation & Reference": "ფორმულა და წყარო",
  "Meets criteria": "აკმაყოფილებს კრიტერიუმებს",
  "Does not meet": "ვერ აკმაყოფილებს",
  "Present (≥3)": "არსებობს (≥3)",
  "Not started yet": "ჯერ არ დაწყებულა",
  "Risk Bands (5 years)": "რისკის დიაპაზონები (5 წელი)",
  "Diet/Lifestyle": "დიეტა/ცხოვრების წესი",
  "Physical activity": "ფიზიკური აქტივობა",
  "Activity level": "აქტივობის დონე",
  "Sedentary": "მჯდომარე",
  "Low active": "დაბალი აქტივობა",
  "Very active": "ძალიან აქტიური",
  "yes": "დიახ",
  "no": "არა",
  "Yes": "დიახ",
  "No": "არა",
  "years": "წელი",
  "yr": "წ",
  "Body weight": "სხეულის წონა",
  "Body weight < 125 lbs": "სხეულის წონა < 125 ფუნტი",
  "Arm assistance to stand from chair":
    "სკამიდან წამოდგომა ხელის დახმარებით",
  "Maternal hip fracture over 50 years old":
    "დედის ბარძაყის მოტეხილობა 50 წლის შემდეგ",
  "Fracture after age 50": "მოტეხილობა 50 წლის შემდეგ",
  "Fractures after age 50": "მოტეხილობები 50 წლის შემდეგ",
  "BMD T-score": "BMD T-ქულა",
  "HDL cholesterol": "HDL ქოლესტერინი",
  "On TG-lowering Rx": "იღებს TG-ის დამწევ თერაპიას",
  "On HDL-C Rx": "იღებს HDL-C თერაპიას",
  "On BP medication": "იღებს არტერიული წნევის მედიკამენტს",
  "Required criterion met": "აუცილებელი კრიტერიუმი შესრულებულია",
  "Other criteria met": "სხვა კრიტერიუმები შესრულებულია",
  "Diagnostic (AACE 2003)": "დიაგნოზი (AACE 2003)",
  "Diagnostic (IDF 2005)": "დიაგნოზი (IDF 2005)",
  "Other criteria breakdown": "სხვა კრიტერიუმების დეტალები",
  "Total Criteria Point Count": "კრიტერიუმების საერთო ქულა",
  "Criteria breakdown": "კრიტერიუმების დეტალები",
  "Abdominal obesity": "აბდომინური ჭარბწონიანობა",
  "HDL low": "HDL დაბალია",
  "T-score": "T-ქულა",
  "Fasting glucose": "უზმოზე გლუკოზა",
  "Fasting plasma glucose": "უზმოზე პლაზმის გლუკოზა",
  "Fasting blood sugar": "უზმოზე სისხლის შაქარი",
  "Systolic Blood Pressure": "სისტოლური არტერიული წნევა",
  "Diastolic BP": "დიასტოლური არტერიული წნევა",
  "Waist circumference": "წელის გარშემოწერილობა",
  "On blood pressure therapy": "იღებს არტერიული წნევის თერაპიას",
  "On blood pressure medication": "იღებს არტერიული წნევის მედიკამენტს",
  "On TG-lowering therapy": "იღებს TG-ის დამწევ თერაპიას",
  "On glucose-lowering therapy": "იღებს გლუკოზის დამწევ თერაპიას",
  "On HDL improvement therapy": "იღებს HDL-ის გამაუმჯობესებელ თერაპიას",
  "South Asian/Chinese/Japanese": "სამხრეთ აზიური/ჩინური/იაპონური",
  "South & Central American": "სამხრეთ და ცენტრალური ამერიკული",
  "Sub-Saharan African": "სუბ-საჰარული აფრიკული",
  "Eastern Mediterranean & Middle East":
    "აღმოსავლეთ ხმელთაშუა ზღვისა და ახლო აღმოსავლეთის",
  "Europid": "ევროპული",
  "VLDL Size:": "VLDL ზომა:",
  "Large VLDL-P:": "დიდი VLDL-P:",
  "LDL Size:": "LDL ზომა:",
  "Small LDL-P:": "პატარა LDL-P:",
  "HDL Size:": "HDL ზომა:",
  "Large HDL-P:": "დიდი HDL-P:",
  "VLDL Size": "VLDL ზომა",
  "Large VLDL-P": "დიდი VLDL-P",
  "LDL Size": "LDL ზომა",
  "Small LDL-P": "პატარა LDL-P",
  "HDL Size": "HDL ზომა",
  "Large HDL-P": "დიდი HDL-P",
};

const georgianWordReplacements: Record<string, string> = {
  Large: "დიდი",
  Small: "პატარა",
  Underweight: "დაბალი წონა",
  Overweight: "ჭარბი წონა",
  Normal: "ნორმა",
  Higher: "მაღალი",
  Lower: "დაბალი",
  Recommendation: "რეკომენდაცია",
  Prediction: "პროგნოზი",
  Decision: "გადაწყვეტა",
  Points: "პუნქტები",
  End: "დასასრული",
  Point: "წერტილი",
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
  const normalized = trimmed.replace(/\s+/g, " ");

  if (Object.prototype.hasOwnProperty.call(georgianTranslations, normalized)) {
    const directMatch = georgianTranslations[normalized];
    return `${leadingWhitespace}${directMatch}${trailingWhitespace}`;
  }

  // Handle common label variants where UI adds trailing punctuation.
  const punctMatch = normalized.match(/^(.*?)([:.])$/);
  if (punctMatch) {
    const base = punctMatch[1];
    const punct = punctMatch[2];
    if (Object.prototype.hasOwnProperty.call(georgianTranslations, base)) {
      const directBase = georgianTranslations[base];
      return `${leadingWhitespace}${directBase}${punct}${trailingWhitespace}`;
    }
  }

  for (const rule of dynamicGeorgianRules) {
    const match = normalized.match(rule.pattern);
    if (!match) continue;
    return `${leadingWhitespace}${rule.replace(
      ...(match.slice(1) as string[])
    )}${trailingWhitespace}`;
  }

  let translated = normalized;
  const sortedPhrases = Object.keys(georgianPhraseReplacements).sort(
    (a, b) => b.length - a.length
  );
  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const phrase of sortedPhrases) {
    if (!translated.includes(phrase)) continue;
    const replacement = georgianPhraseReplacements[phrase];
    const isSingleWord = /^[A-Za-z]+$/.test(phrase);
    if (isSingleWord) {
      const wordRe = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "g");
      translated = translated.replace(wordRe, replacement);
      continue;
    }
    translated = translated.split(phrase).join(replacement);
  }

  if (translated !== normalized) {
    return `${leadingWhitespace}${translated}${trailingWhitespace}`;
  }

  // Last fallback: translate common standalone words inside mixed labels.
  let wordTranslated = normalized;
  for (const [word, replacement] of Object.entries(georgianWordReplacements)) {
    const re = new RegExp(`(^|[^A-Za-z])(${word})(?=$|[^A-Za-z])`, "g");
    wordTranslated = wordTranslated.replace(re, (_m, p1) => `${p1}${replacement}`);
  }
  if (wordTranslated !== normalized) {
    return `${leadingWhitespace}${wordTranslated}${trailingWhitespace}`;
  }

  return text;
}
