// ═══════════════════════════════════════════════════════════════
//  ALL DISTRICTS OF INDIA  — organized by state
//  Each district maps to a hub city used in the routing graph
// ═══════════════════════════════════════════════════════════════

const INDIA_DISTRICTS = {
    "Andhra Pradesh": {
        hub: "Hyderabad",
        districts: [
            "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla",
            "Chittoor", "East Godavari", "Eluru", "Guntur", "Kakinada", "Konaseema",
            "Krishna", "Kurnool", "Manyam", "NTR", "Nandyal", "Nellore", "Palnadu",
            "Prakasam", "Srikakulam", "Sri Sathya Sai", "Tirupati", "Visakhapatnam",
            "Vizianagaram", "West Godavari", "YSR Kadapa"
        ]
    },
    "Arunachal Pradesh": {
        hub: "Guwahati",
        districts: [
            "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang",
            "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding",
            "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai",
            "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang",
            "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
        ]
    },
    "Assam": {
        hub: "Guwahati",
        districts: [
            "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
            "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
            "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup",
            "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur",
            "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur",
            "South Salmara-Mankachar", "Tamulpur", "Tinsukia", "Udalguri", "West Karbi Anglong"
        ]
    },
    "Bihar": {
        hub: "Patna",
        districts: [
            "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur",
            "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad",
            "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura",
            "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia",
            "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
            "Siwan", "Supaul", "Vaishali", "West Champaran"
        ]
    },
    "Chhattisgarh": {
        hub: "Raipur",
        districts: [
            "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur",
            "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa",
            "Jashpur", "Kabirdham", "Kanker", "Khairagarh-Chhuikhadan-Gandai", "Kondagaon",
            "Korba", "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki",
            "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sakti", "Sarangarh-Bilaigarh",
            "Sukma", "Surajpur", "Surguja"
        ]
    },
    "Goa": {
        hub: "Mumbai",
        districts: ["North Goa", "South Goa"]
    },
    "Gujarat": {
        hub: "Ahmedabad",
        districts: [
            "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar",
            "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar",
            "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana",
            "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot",
            "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
        ]
    },
    "Haryana": {
        hub: "Delhi",
        districts: [
            "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram",
            "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh",
            "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa",
            "Sonipat", "Yamunanagar"
        ]
    },
    "Himachal Pradesh": {
        hub: "Chandigarh",
        districts: [
            "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti",
            "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
        ]
    },
    "Jharkhand": {
        hub: "Ranchi",
        districts: [
            "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa",
            "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma",
            "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj",
            "Seraikela Kharsawan", "Simdega", "West Singhbhum"
        ]
    },
    "Karnataka": {
        hub: "Bengaluru",
        districts: [
            "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar",
            "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada",
            "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu",
            "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga",
            "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Vijayanagara", "Yadgir"
        ]
    },
    "Kerala": {
        hub: "Kochi",
        districts: [
            "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam",
            "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram",
            "Thrissur", "Wayanad"
        ]
    },
    "Madhya Pradesh": {
        hub: "Bhopal",
        districts: [
            "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul",
            "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia",
            "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore",
            "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur",
            "Morena", "Mauganj", "Narsimhapur", "Neemuch", "Niwari", "Panna", "Raisen",
            "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol",
            "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain",
            "Umaria", "Vidisha"
        ]
    },
    "Maharashtra": {
        hub: "Mumbai",
        districts: [
            "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana",
            "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna",
            "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded",
            "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad",
            "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane",
            "Wardha", "Washim", "Yavatmal"
        ]
    },
    "Manipur": {
        hub: "Guwahati",
        districts: [
            "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam",
            "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong",
            "Tengnoupal", "Thoubal", "Ukhrul"
        ]
    },
    "Meghalaya": {
        hub: "Guwahati",
        districts: [
            "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills",
            "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills",
            "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
        ]
    },
    "Mizoram": {
        hub: "Guwahati",
        districts: [
            "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei",
            "Mamit", "Saiha", "Saitual", "Serchhip"
        ]
    },
    "Nagaland": {
        hub: "Guwahati",
        districts: [
            "Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon",
            "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyü", "Tuensang",
            "Wokha", "Zunheboto"
        ]
    },
    "Odisha": {
        hub: "Bhubaneswar",
        districts: [
            "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack",
            "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
            "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha",
            "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
            "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"
        ]
    },
    "Punjab": {
        hub: "Amritsar",
        districts: [
            "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka",
            "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana",
            "Malerkotla", "Mansa", "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala",
            "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"
        ]
    },
    "Rajasthan": {
        hub: "Jaipur",
        districts: [
            "Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar",
            "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa",
            "Deeg", "Dholpur", "Didwana-Kuchaman", "Dudu", "Dungarpur", "Gangapur City",
            "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar",
            "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Khairthal-Tijara",
            "Kota", "Kotputli-Behror", "Nagaur", "Neem Ka Thana", "Pali", "Pratapgarh",
            "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar",
            "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
        ]
    },
    "Sikkim": {
        hub: "Guwahati",
        districts: ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"]
    },
    "Tamil Nadu": {
        hub: "Chennai",
        districts: [
            "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
            "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanniyakumari", "Karur",
            "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal",
            "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem",
            "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli",
            "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai",
            "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
        ]
    },
    "Telangana": {
        hub: "Hyderabad",
        districts: [
            "Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial", "Jangaon",
            "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
            "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial",
            "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda",
            "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla",
            "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad",
            "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
        ]
    },
    "Tripura": {
        hub: "Guwahati",
        districts: [
            "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "Sipahijala",
            "South Tripura", "Unakoti", "West Tripura"
        ]
    },
    "Uttar Pradesh": {
        hub: "Lucknow",
        districts: [
            "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya",
            "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki",
            "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot",
            "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar",
            "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi",
            "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar",
            "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow",
            "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur",
            "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli",
            "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Sant Ravidas Nagar",
            "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra",
            "Sultanpur", "Unnao", "Varanasi"
        ]
    },
    "Uttarakhand": {
        hub: "Delhi",
        districts: [
            "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital",
            "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
        ]
    },
    "West Bengal": {
        hub: "Kolkata",
        districts: [
            "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling",
            "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda",
            "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur",
            "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
        ]
    },
    // ── Union Territories ──
    "Delhi": {
        hub: "Delhi",
        districts: [
            "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
            "North West Delhi", "Shahdara", "South Delhi", "South East Delhi",
            "South West Delhi", "West Delhi"
        ]
    },
    "Jammu & Kashmir": {
        hub: "Delhi",
        districts: [
            "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu",
            "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri",
            "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
        ]
    },
    "Ladakh": {
        hub: "Delhi",
        districts: ["Kargil", "Leh"]
    },
    "Chandigarh": {
        hub: "Chandigarh",
        districts: ["Chandigarh"]
    },
    "Puducherry": {
        hub: "Chennai",
        districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"]
    },
    "Andaman & Nicobar Islands": {
        hub: "Kolkata",
        districts: ["Nicobar", "North and Middle Andaman", "South Andaman"]
    },
    "Lakshadweep": {
        hub: "Kochi",
        districts: ["Lakshadweep"]
    },
    "Dadra & Nagar Haveli and Daman & Diu": {
        hub: "Mumbai",
        districts: ["Dadra and Nagar Haveli", "Daman", "Diu"]
    }
};

// ─── Flat lookup: district name → hub city ───────────────────
const DISTRICT_HUB_MAP = {};
for (const [state, data] of Object.entries(INDIA_DISTRICTS)) {
    for (const district of data.districts) {
        // store as "District (State)" to avoid name collisions
        DISTRICT_HUB_MAP[`${district} (${state})`] = data.hub;
    }
}