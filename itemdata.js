export const itemCategories = {
    normal: {
    title: "Normal Eşya",
        items: [
        { id: "adaletineli", name: "Adaletin Eli",
            components: ["tanricaningozyasi", "idmaneldiveni"],
            stats: [ { icon: "[critchance]", value: "+20" },{ icon: "[mana]", value: "+1" } ],
            desc: "Kullanıcı 2 etki kazanır:<br>%15 Saldırı Gücü ve %15 Yetenek Gücü<br>%12 Mutlak Sömürü<br><br>Kullanıcının canı %50 değerinin üstündeyken saldırı gücü ve yetenek gücü iki katına çıkar. Canı %50 değerinin altındayken ise iki kat mutlak sömürü kazanır." },
            
        { id: "basmelekasasi", name: "Başmelek Asası",
            components: ["asiribuyuksopa", "tanricaningozyasi"],
            stats: [ { icon: "[ap]", value: "+30" },{ icon: "[mana]", value: "+1" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı çatışmadayken 5 saniyede bir %20 Yetenek Gücü kazanır." },

        { id: "civa", name: "Cıva",
            components: ["idmaneldiveni", "negatronpelerini"],
            stats: [ { icon: "[as]", value: "+15" },{ icon: "[critchance]", value: "+20"},{ icon: "[mr]", value: "+20" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı 18 saniyeliğine kitle kontrolü etkilerine karşı bağışıklık kazanır." },

        { id: "degiskenmigfer", name: "Değişken Miğfer",
            components: ["negatronpelerini", "tanricaningozyasi"],
            stats: [ { icon: "[mr]", value: "+20" },{ icon: "[mana]", value: "+3" } ],
            desc: "Kullanıcı tüm kaynaklardan fazladan %15 Mana kazanır. Ayrıca kullanıcı rolüne bağlı olarak fazladan bir ilave kazanır:<br><br>Tank veya Dövüşçü: 45 Zırh ve Büyü Direnci kazanır.<br><br>Diğer Roller: %10 Saldırı Gücü ve Yetenek Gücü kazanır." },

        { id: "dengeortusu", name: "Denge Örtüsü",
            components: ["negatronpelerini", "devkemeri"],
            stats: [ { icon: "[hp]", value: "+250" },{ icon: "[mr]", value: "+20" } ],
            desc: "Kullanıcı 2 hücrelik bir alan içindeki rakipleri %30 <b>aşındırır</b> ve çatışmanın ilk 15 saniyesi boyunca 25 Zırh ve Büyü Direnci kazanır.<br><br><b class='txt-info'>Aşındırma: Aşındırılan birimlerin zırhı azalır.</b>" },

        { id: "devkatili", name: "Dev Katili",
            components: ["tekkilici", "nisanciyayi"],
            stats: [ { icon: "[ad]", value: "+15%" },{ icon: "[ap]", value: "+15" },{ icon: "[as]", value: "+15" },{ icon: "[amp]", value: "+15%" }],
            desc: "Kullanıcı tanklara karşı fazladan %15 Hasar Artışı kazanır." },

        { id: "dikenliyelek", name: "Dikenli Yelek",
            components: ["zinciryelek", "zinciryelek"],
            stats: [ { icon: "[armor]", value: "+65" }],
            desc: "Kullanıcı %9 Azami Can kazanır.<br><br>Kullanıcı saldırılardan %5 daha az hasar alır. Bir saldırıdan isabet aldığında bitişiğindeki tüm rakiplere <b class='txt-ap'>100 Büyü Hasarı</b> verir.<br><br><b class='txt-info'>Bu etkinin 2 saniyelik bir bekleme süresi vardır.</b>" },

        { id: "ebedikilic", name: "Ebedi Kılıç",
            components: ["tekkilici", "idmaneldiveni"],
            stats: [ { icon: "[ad]", value: "+35%" },{ icon: "[critchance]", value: "+35" } ],
            desc: "Kullanıcı yeteneğiyle kritik vuruş yapabilir.<br><br>Kullanıcı halihazırda yeteneğiyle kritik vuruş yapabiliyorsa bunun yerine %10 Kritik Vuruş Hasarı kazanır." },

        { id: "ejderpencesi", name: "Ejder Pençesi", 
            components: ["negatronpelerini", "negatronpelerini"],
            stats: [ { icon: "[mr]", value: "+75" }],
            desc: "Kullanıcı %9 Azami Can kazanır.<br><br>Kullanıcı 2 saniyede bir azami canının %2.5 kadarını yeniler." },

        { id: "gargoyltaszirhi", name: "Gargoyl Taşzırhı", 
            components: ["zinciryelek", "negatronpelerini"],
            stats: [ { icon: "[armor]", value: "+25" },{ icon: "[hp]", value: "+100" },{ icon: "[mr]", value: "+25" } ],
            desc: "Kullanıcı onu hedef alan her rakip başına 10 Zırh ve 10 Büyü Direnci kazanır." },

        { id: "geceninkiyisi", name: "Gecenin Kıyısı",
            components: ["tekkilici", "zinciryelek"],
            stats: [ { icon: "[ad]", value: "+10%" },{ icon: "[ap]", value: "+10" },{ icon: "[as]", value: "+15" },{ icon: "[armor]", value: "+20" } ],
            desc: "Can azaldığında kısa süreli gizlenme ve hız kazanır." },

        { id: "guinsoonunhiddeti", name: "Guinsoo'nun Hiddeti", 
            components: ["nisanciyayi", "asiribuyuksopa"],
            stats: [ { icon: "[ap]", value: "+10" },{ icon: "[as]", value: "10" } ],
            desc: "Kullanıcı her saniye birikecek şekilde %7 Saldırı Hızı kazanır." },

        { id: "gunatesipelerini", name: "Günateşi Pelerini", 
            components: ["zinciryelek", "devkemeri"],
            stats: [ { icon: "[armor]", value: "+20" },{ icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı %8 Azami Can kazanır.<br><br>Kullanıcı 2 saniyede bir 2 hücrelik bir alan içindeki bir rakibi 10 saniye boyunca %1 <b class='txt-bold'>yakar</b> ve %1 <b class='txt-bold'>yaralar</b>.<br><br><b class='txt-info'>Yakma: Yanan birimler her saniye azami canlarının belli bir oranına eşdeğer miktarda gerçek hasar alır. Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</b>" },

        { id: "hextechsilahkilic", name: "Hextech Silahkılıç", 
            components: ["tekkilici", "asiribuyuksopa"],
            stats: [ { icon: "[ad]", value: "+20%" },{ icon: "[ap]", value: "+20" },{ icon: "[mana]", value: "+1" },{ icon: "[sv]", value: "+15%" } ],
            desc: "Kullanıcı yüzdelik canı en düşük takım arkadaşını verdiği hasarın %20 kadarına eşdeğer miktarda iyileştirir.<br><br>Takım Arkadaşlarına Yönelik İyileştirme: 0" },

        { id: "hiclikdegnegi", name: "Hiçlik Değneği", 
            components: ["nisanciyayi", "tanricaningozyasi"],
            stats: [ { icon: "[ap]", value: "+35" },{ icon: "[as]", value: "+15" },{ icon: "[mana]", value: "+1" } ],
            desc: "Kullanıcı saldırı ve yetenekleriyle hasar verdiğinde hedefi 5 saniyeliğine %30 <b class='txt-bold'>örseler</b>. Bu etki birikmez.<br><br><b class='txt-info'>Örselme: Örselenen birimlerin büyü direnci azalır.</b>" },

        { id: "hirsizeldiveni", name: "Hırsız Eldiveni", 
            components: ["idmaneldiveni", "idmaneldiveni"],
            stats: [ { icon: "[critchance]", value: "+20" },{ icon: "[hp]", value: "+150" } ],
            desc: "Her Tur: Kullanıcı rasgele 2 eşya kazanır.<br><br><b class='txt-info'>3 eşya yuvası kullanır.</b>" },

        { id: "hucumgurzu", name: "Hücum Gürzü", 
            components: ["devkemeri", "idmaneldiveni"],
            stats: [ { icon: "[as]", value: "+10" },{ icon: "[amp]", value: "+5%" },{ icon: "[critchance]", value: "+20" },{ icon: "[hp]", value: "+150" } ],
            desc: "Kritik vuruşlar 5 saniyeliğine %5 Hasar Artışı kazandırır. Bu ilave en fazla 4 defa birikir." },

        { id: "iyonkivilcimi", name: "İyon Kıvılcımı", 
            components: ["asiribuyuksopa", "negatronpelerini"],
            stats: [ { icon: "[ap]", value: "+15" },{ icon: "[hp]", value: "+250" },{ icon: "[mr]", value: "+35" } ],
            desc: "Büyü direnci kırar ve büyü yapan rakiplere hasar Kullanıcı 2 hücrelik bir alan içindeki rakipleri %30 örseler. Bu rakipler yetenek kullandıklarında harcadıkları mananın %150 kadarına eşdeğer miktarda büyü hasarı alır.<br><br><b class='txt-info'>Örselme: Örselenen birimlerin büyü direnci azalır.</b>" },

        { id: "kanasusamis", name: "Kanasusamış",
            components: ["tekkilici", "negatronpelerini"],
            stats: [ { icon: "[ad]", value: "+15%" },{ icon: "[ap]", value: "+15" },{ icon: "[mr]", value: "+20" },{ icon: "[sv]", value: "+20%" } ], 
            desc: "Kullanıcı çatışmada bir kez olmak üzere canı %40 değerine düştüğünde en fazla 5 saniyeliğine azami canının %25 kadarına eşdeğer miktarda kalkan kazanır." },

        { id: "kararliyurek", name: "Kararlı Yürek", 
            components: ["zinciryelek", "idmaneldiveni"],
            stats: [ { icon: "[armor]", value: "+20" },{ icon: "[critchance]", value: "+20" },{ icon: "[hp]", value: "+250" } ],
            desc: "Kullanıcı %10 Dayanıklılık kazanır. Canı %50 değerinin üstündeyken %18 Dayanıklılık kazanır." },

        { id: "kirmiziguclendirme", name: "Kırmızı Güçlendirme",
            components: ["nisanciyayi", "nisanciyayi"],
            stats: [ { icon: "[as]", value: "+45" },{ icon: "[amp]", value: "+6%" } ], 
            desc: "Kullanıcının yeteneği ve saldırıları rakipleri 5 saniyeliğine %1 <b class='txt-bold'>yakar</b> ve %33 <b class='txt-bold'>yaralar</b>.<br><br><b class='txt-info'>Yakma: Yanan birimler her saniye azami canlarının belli bir oranına eşdeğer miktarda gerçek hasar alır.Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</b>" },

        { id: "krakeninofkesi", name: "Kraken'in Öfkesi",
            components: ["negatronpelerini", "nisanciyayi"],
            stats: [ { icon: "[ad]", value: "+10%" },{ icon: "[as]", value: "+10" },{ icon: "[mr]", value: "+20" } ],
            desc: "Kullanıcının saldırıları birikecek şekilde %3.5 Saldırı Gücü sağlar. En fazla 15 kez birikebilir. Kullanıcı 15 saldırı yaptıktan sonra %30 Saldırı Hızı kazanır." },

        { id: "kraliyetbasligi", name: "Kraliyet Başlığı",
            components: ["asiribuyuksopa", "zinciryelek"],
            stats: [ { icon: "[ap]", value: "+20" },{ icon: "[armor]", value: "+20" },{ icon: "[hp]", value: "+100" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı, 8 saniyeliğine azami canının %25 kadarına eşdeğer miktarda kalkan kazanır.<br><br>Kullanıcı kalkanın süresi dolduğunda %25 Yetenek Gücü kazanır." },

        { id: "maviguclendirme", name: "Mavi Güçlendirme", 
            components: ["tanricaningozyasi", "tanricaningozyasi"],
            stats: [ { icon: "[ad]", value: "+15%" },{ icon: "[ap]", value: "+15" },{ icon: "[mana]", value: "+5" } ],
            desc: "Kullanıcı tüm kaynaklardan fazladan %10 Saldırı Gücü ve Yetenek Gücü kazanır." },

        { id: "morellonomikon", name: "Morellonomikon",
            components: ["asiribuyuksopa", "devkemeri"],
            stats: [ { icon: "[ap]", value: "+20" },{ icon: "[hp]", value: "+150" },{ icon: "[mana]", value: "+1" } ],
            desc: "Yetenek hasarı Kullanıcının yeteneği ve saldırıları rakipleri 10 saniyeliğine %1 <b class='txt-bold'>yakar</b> ve %1 <b class='txt-bold'>yaralar</b>.<br><br><b class='txt-info'>Yakma: Yanan birimler her saniye azami canının belli bir oranına eşdeğer miktarda gerçek hasar alır.Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</b>" },

        { id: "muhafizinadagi", name: "Muhafızın Adağı", 
            components: ["tanricaningozyasi", "devkemeri"],
            stats: [ { icon: "[armor]", value: "+25" },{ icon: "[mr]", value: "+25" },{ icon: "[mana]", value: "+1" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı 20 Mana kazanır.<br><br>Kullanıcı, canı %40 değerine düştüğünde 15 Mana ve azami canının %20 kadarına eşdeğer miktarda kalkan kazanır." },

        { id: "mucevherlieldiven", name: "Mücevherli Eldiven", 
            components: ["asiribuyuksopa", "idmaneldiveni"],
            stats: [ { icon: "[ap]", value: "+35" },{ icon: "[critchance]", value: "+35" } ],
            desc: "Kullanıcı yeteneğiyle kritik vuruş yapabilir.<br><br>Kullanıcı halihazırda yeteneğiyle kritik vuruş yapabiliyorsa bunun yerine %10 Kritik Vuruş Hasarı kazanır." },

        { id: "nashorundisi", name: "Nashor'un Dişi",
            components: ["nisanciyayi", "asiribuyuksopa"],
            stats: [ { icon: "[ap]", value: "+15" },{ icon: "[as]", value: "+10" },{ icon: "[critchance]", value: "+20" },{ icon: "[hp]", value: "+150" } ], 
            desc: "Kullanıcının saldırıları 2 İlave Mana yeniler. Kritik vuruş yaparsa bu ilave artarak 4 olur." },

        { id: "olumkilici", name: "Ölüm Kılıcı",
            components: ["tekkilici", "tekkilici"],
            stats: [ { icon: "[ad]", value: "+55%" },{ icon: "[amp]", value: "+10%" } ], 
            desc: "<b class='txt-info'>Kullanıcı huzurla dolar, karşısına çıkanlarsa huzura erer.</b>"},

        { id: "rabadonunsapkasi", name: "Rabadon'un Şapkası", 
            components: ["asiribuyuksopa", "asiribuyuksopa"],
            stats: [ { icon: "[ap]", value: "+50" },{ icon: "[amp]", value: "+15%" } ],
            desc: "<b class='txt-info'>Bu naçiz şapka yeri gelince vezir de eder, rezil de.</b>" },

        { id: "ruhgomlegi", name: "Ruh Gömleği", 
            components: ["tanricaningozyasi", "devkemeri"],
            stats: [ { icon: "[hp]", value: "+300" },{ icon: "[mana]", value: "+2" },{ icon: "[dr]", value: "+10%" } ],
            desc: "Kullanıcı her saniye eksik canının %2.5 kadarını yeniler." },

        { id: "shojininmizragi", name: "Shojin'in Mızrağı",
            components: ["tekkilici", "tanricaningozyasi"],
            stats: [ { icon: "[ad]", value: "+15%" },{ icon: "[ap]", value: "+15" },{ icon: "[mana]", value: "+1" } ], 
            desc: "Saldırılar fazladan 5 Mana yeniler." },

        { id: "sonfisilti", name: "Son Fısıltı", 
            components: ["nisanciyayi", "idmaneldiveni"],
            stats: [ { icon: "[ad]", value: "+15%" },{ icon: "[as]", value: "+20" },{ icon: "[critchance]", value: "+20" } ],
            desc: "Kullanıcı saldırı ve yetenekleriyle hasar verdiğinde hedefi 3 saniyeliğine %30 <b class='txt-bold'>aşındırır</b>. Bu etki birikmez.<br><br><b class='txt-info'>Aşındırma: Aşındırılan birimlerin zırhı azalır." },

        { id: "sterakinguvencesi", name: "Sterak'ın Güvencesi", 
            components: ["tekkilici", "devkemeri"],
            stats: [ { icon: "[ad]", value: "+40%" },{ icon: "[hp]", value: "+300" } ],
            desc: "Kullanıcı canı %60 değerine düştüğünde azami canının %50 kadarına eşdeğer miktarda kalkan kazanır. Kalkan 4 saniye içinde hızla azalarak kaybolur." },

        { id: "titaninazmi", name: "Titanın Azmi",
            components: ["zinciryelek", "nisanciyayi"],
            stats: [ { icon: "[as]", value: "+10" },{ icon: "[armor]", value: "+20%" } ],
            desc: "Kullanıcı saldırırken veya hasar alırken en fazla 25 kez birikecek şekilde %2 Saldırı Gücü ve %2 Yetenek Gücü kazanır.<br><br>Tam yüke ulaştığında %10 Hasar Artışı ve kitle kontrolü etkilerine karşı bağışıklık kazanır." },

        { id: "warmogunzirhi", name: "Warmog'un Zırhı",
            components: ["devkemeri", "devkemeri"],
            stats: [ { icon: "[hp]", value: "+500" } ], 
            desc: "Kullanıcı %15 Azami Can kazanır." }
        ]
    },

    artifact: {
    title: "Yadigar Eşya",
        items: [
        { id: "aklinsonu", name: "Aklın Sonu",
            stats: [ { icon: "[as]", value: "+25" },{ icon: "[armor]", value: "+20" },{ icon: "[hp]", value: "+400" },{ icon: "[mr]", value: "+20" } ],
            desc: "Kullanıcının saldırıları X İlave Büyü Hasarı verir.<br><br>Kullanıcı büyü hasarı verdiğinde bu hasarın %30 kadarına eşdeğer miktarda can yeniler.<br><br><b class='txt-info'>Hasar aşamaya bağlı olarak artar.</b>" },

        { id: "alacakaranlikkalkani", name: "Alacakaranlık Kalkanı", 
            stats: [ { icon: "[hp]", value: "+200" },{ icon: "[mr]", value: "+70" } ],
            desc: "Kullanıcı her 2.5 saniyede bir 1 hücrelik bir alan içindeki rakiplerden 5 Büyü Direnci çalar ve onlara kendi büyü direncinin %15 kadarına eşdeğer büyü hasarı verir.<br><br>Kullanıcı aynı zamanda Şafak Kalkanı'na da sahipse bu eşyanın etkisi her 1.3 saniyede bir tetiklenir.<br><br><b class='txt-info'>Bu hasar aşamaya bağlı olarak artar.</b>" },

        { id: "altintoplayici", name: "Altın Toplayıcı", 
            stats: [ { icon: "[ad]", value: "+40%" },{ icon: "[critchance]", value: "+20" } ],
            desc: "Kullanıcının saldırıları ve yeteneği azami canı %12 değerinin altındaki rakipleri infaz eder. İnfazlar %33 ihtimalle 1 Altın [gold] kazandırır.<br><br>Toplanan Altın: 0 Altın <br><b class='txt-uniq'>Özel - şampiyon başına sadece bir adet</b>" }, 

        { id: "bombardimantopu", name: "Bombardıman Topu", 
            stats: [ { icon: "[as]", value: "+65" } ],
            desc: "Kullanıcı 1 Saldırı Menzili kazanır. Bu ilave kullanıcı bir rakibi katlettiğinde 1 artar." },

        { id: "cehennematesibaltasi", name: "Cehennem Ateşi Baltası", 
            stats: [ { icon: "[ad]", value: "+20%" },{ icon: "[hp]", value: "+150" },{ icon: "[sv]", value: "+20" } ],
            desc: "Kullanıcı, saldırılarıyla azami canının %2 kadarına eşdeğer miktarda ilave fiziksel hasar verir. Ayrıca kullanıcı her %1 Eksik Can başına %1 Saldırı Hızı kazanır." },

        { id: "darkinasa", name: "Darkin Asa", 
            stats: [ { icon: "[ap]", value: "+40" },{ icon: "[mana]", value: "+2" } ],
            desc: "Kullanıcı Darkin özelliği kazanır.<br><br>Ayrıca harcadığı her 20 Mana başına mevcut hedefinin yakınındaki rakiplere bir filiz fırlatarak 50 Büyü Hasarı verir.<br><br>Bu hasar aşamaya bağlı olarak artar." },

        { id: "darkinkalkan", name: "Darkin Kalkan", 
            stats: [ { icon: "[armor]", value: "+25" },{ icon: "[hp]", value: "+200" },{ icon: "[mr]", value: "+25" } ],
            desc: "Kullanıcı Darkin özelliği kazanır.<br><br>Ayrıca 2 hücrelik bir alanın içindeki rakiplere her saniye azami canının %1 kadarına eşdeğer miktarda büyü hasarı verir. Kullanıcı bu alanda bir rakip katledildiğinde azami canının %2 kadarını yeniler." },

        { id: "darkintirpan", name: "Darkin Tırpan", 
            stats: [ { icon: "[ad]", value: "+25%" },{ icon: "[ap]", value: "+25" } ],
            desc: "Kullanıcı Darkin özelliği kazanır.<br><br>Ayrıca her 4 saniyede bir bitişiğindeki rakiplere saldırarak normal saldırı hasarının %200 kadarına eşdeğer miktarda fiziksel hasar verir. Kullanıcı bir rakibi alt ettiğinde veya atıldığında yeniden saldırır.<br><br>Atılma Bekleme Süresi: 1.5 saniye" },

        { id: "darkinyay", name: "Darkin Yay", 
            stats: [ { icon: "[ad]", value: "+10%" },{ icon: "[as]", value: "+20" } ],
            desc: "Kullanıcı Darkin özelliği kazanır.<br><br>Ayrıca her 10 saldırıda bir mevcut hedefini deşip geçen bir ok atarak normal saldırı hasarının %500 kadarına eşdeğer miktarda fiziksel hasar verir. Bu hasar isabet alan rakip başına %33 azalır." },

        { id: "ebedianlasma", name: "Ebedi Anlaşma", 
            stats: [ { icon: "[ap]", value: "+40" },{ icon: "[mana]", value: "+1" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı en yüksek cana sahip takım arkadaşıyla bir anlaşma yapar. Takım arkadaşı katledilirse kullanıcı 10 Mana Yenilenmesi ve %40 Yetenek Gücü kazanır.<br><br>Takım arkadaşı yeteneğini kullandığında kullanıcı 6 Mana kazanır. Ayrıca her 6 saniyede bir takım arkadaşına kendi yetenek gücünün %150 kadarına eşdeğer miktarda bir kalkan kazandırır." },

        { id: "ebedikuvvet", name: "Ebedi Kuvvet", 
            stats: [ { icon: "[ad]", value: "+30" },{ icon: "[ap]", value: "+30" },{ icon: "[as]", value: "+30" },{ icon: "[armor]", value: "+30" },{ icon: "[hp]", value: "+300" },{ icon: "[mr]", value: "+30" } ],
            desc: "<b class='txt-info'>Her şeyden azar azar, toplayınca tonla hasar!</b>" },

        { id: "felaketmucevheri", name: "Felaket Mücevheri", 
            stats: [ { icon: "[ap]", value: "+60" },{ icon: "[mana]", value: "+2" } ],
            desc: "Kullanıcı büyü hasarı verdiğinde hedefinin büyü direncini 2 azaltır. Hedefinin büyü direnci 0 ise büyü hasarı verdiğinde 2 Mana kazanır.<br><br>Yetenek hasarı her rakibin üstünde sadece 0.5 saniyede bir tetiklenebilir." },

        { id: "gumusgolsafagi", name: "Gümüşgöl Şafağı", 
            stats: [ { icon: "[ad]", value: "+140%" },{ icon: "[armor]", value: "+80" },{ icon: "[mr]", value: "+80" } ],
            desc: "Kullanıcı sersemletmelere karşı bağışıklık kazanır ve saldırıları hedefi 0.8 saniyeliğine sersemletir.<br><br>Kullanıcının saldırı hızı 0.5 değerinde sabitlenir." },

        { id: "hasmetlihydra", name: "Haşmetli Hydra", 
            stats: [ { icon: "[ad]", value: "+20%" },{ icon: "[as]", value: "+20" },{ icon: "[hp]", value: "+300" } ],
            desc: "Kullanıcı saldırılarıyla hedefe ve bitişiğindeki rakiplere azami canının %3 kadarı + saldırı gücünün %8 kadarına eşdeğer miktarda ilave fiziksel hasar verir." },

        { id: "hiclikeldiveni", name: "Hiçlik Eldiveni", 
            stats: [ { icon: "[hp]", value: "+300" },{ icon: "[dr]", value: "+10%" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı azami canının %30 kadarını depolar ve her saniye %2.5 daha depolar. Katledildiğinde 4 hücrelik bir alan içindeki rakipler arasında bölüştürülecek şekilde depoladığı cana bağlı olarak büyü hasarı verir.<br><br><b class='txt-crit'>Özel - şampiyon başına sadece bir adet</b>" },

        { id: "kilcik", name: "Kılçık", 
            stats: [ { icon: "[ad]", value: "+50%" },{ icon: "[as]", value: "+50" } ],
            desc: "Kullanıcının saldırıları rasgele rakipleri hedef alır." },

        { id: "lichbogan", name: "Lich Boğan", 
            stats: [ { icon: "[ap]", value: "+55" },{ icon: "[as]", value: "+10" } ],
            desc: "Kullanıcının her yetenek kullanımından sonraki ilk saldırısı X İlave Büyü Hasarı verir.<br><br><b class='txt-info'>Hasar aşamaya bağlı olarak artar.</b>" },

        { id: "lightshieldarmasi", name: "Lightshield Arması", 
            stats: [ { icon: "[armor]", value: "+55" },{ icon: "[mr]", value: "+55" } ],
            desc: "Kullanıcı 3 saniyede bir yüzdelik canı en düşük takım arkadaşına 5 saniyeliğine kendi toplam zırh ve büyü direncinin %70 kadarına eşdeğer miktarda kalkan kazandırır.<br><br>Kullanıcı katledildiğinde bu kalkanı tüm takım arkadaşlarına kazandırır." },

        { id: "ludenincigligi", name: "Luden'in Çığlığı", 
            stats: [ { icon: "[ad]", value: "+50%" },{ icon: "[ap]", value: "+50" } ],
            desc: "Kullanıcı bir hedefi katlettiğinde hedefin en yakınındaki üç rakibe fazlalık hasarın %100 kadarı artı 100 Büyü Hasarı verir." },

        { id: "maceracininpazubendi", name: "Maceracının Pazubendi", 
            stats: [ { icon: "[ap]", value: "+25" },{ icon: "[armor]", value: "+10" },{ icon: "[mr]", value: "+10" },{ icon: "[sv]", value: "+20" } ],
            desc: "Kullanıcı alt etme halinde 20 Zırh, Büyü Direnci ve Yetenek Gücü kazanır." },

        { id: "mogulunzirhi", name: "Mogul'un Zırhı", 
            stats: [ { icon: "[hp]", value: "+300" } ],
            desc: "Kullanıcı hasar aldığında 1 Zırh, 1 Büyü Direnci ve 5 Can kazanır. Bu etki en fazla 35 defa birikir.<br><br>Azami yüke ulaştığında 1 Altın [gold] kazanırsın. Ayrıca her 12 saniyede bir 1 Altın [gold] kazanırsın.<br><br><b class='txt-info'>Bu Oyunda Kazanılan Altın: 0<br><br><b class='txt-crit'>Özel - şampiyon başına sadece bir adet</br>" },

        { id: "olumunisyani", name: "Ölümün İsyanı", 
            stats: [ { icon: "[ad]", value: "+25%" },{ icon: "[as]", value: "+15" },{ icon: "[armor]", value: "+40" },{ icon: "[sv]", value: "+25" } ],
            desc: "Kullanıcı aldığı hasarın %50 kadarını 4 saniye boyunca ölümcül olmayan hasar olarak alır.<br><br><b class='txt-uniq'>Özel - şampiyon başına sadece bir adet</br>" },

        { id: "omurgaparcalayan", name: "Omurgaparçalayan", 
            stats: [ { icon: "[armor]", value: "+50" },{ icon: "[mr]", value: "+50" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı bitişiğinde bir takım arkadaşı yoksa 400 Can, %10 Saldırı Gücü ve %10 Yetenek Gücü kazanır." },

        { id: "pofudukeldiven", name: "Pofuduk Eldiven", 
            stats: [ { icon: "[as]", value: "+65" } ],
            desc: "Kullanıcı küçülür ve hareket hızı artışı kazanır. Ayrıca <b class='txt-bold'>buz tutma</b>, <b class='txt-bold'>yakma</b> ve <b class='txt-bold'>yara</b> etkilerine karşı bağışıklığa sahip olur.<br><br> <b class='txt-info'>Buz Tutma: Buz tutan birimlerin saldırı hızı azalır. <br>Yakma: Yanan birimler her saniye azami canlarının belli bir oranına eşdeğer miktarda gerçek hasar alır.<br>Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</br>"  },

        { id: "purdikkatnisanci", name: "Pürdikkat Nişancı", 
            stats: [ { icon: "[ad]", value: "+20%" },{ icon: "[ap]", value: "+20" },{ icon: "[as]", value: "+20" } ],
            desc: "Kullanıcı 4 veya daha fazla hücre uzağındaki hedeflere karşı %40 Hasar Artışı kazanır." },

        { id: "rizikocununbicagi", name: "Rizikocunun Bıçağı", 
            stats: [ { icon: "[as]", value: "+45" } ],
            desc: "Kullanıcı, biriktirdiğin altın [gold] başına %1 İlave Saldırı Hızı [as] kazanır (en fazla 30 [gold]).<br><br>Kullanıcının her saldırısı %5 ihtimalle 1 Altın [gold] kazandırabilir.<br><br><b class='txt-info'>Bu Oyunda Kazanılan Altın: 0</br><br><b class='txt-uniq'>Özel - şampiyon başına sadece bir adet</br>" },

        { id: "safaginozu", name: "Şafağın Özü", 
            stats: [ { icon: "[ad]", value: "+10%" },{ icon: "[ap]", value: "+10" } ],
            desc: "Kullanıcının azami manası 10 azalır. İlkinden sonraki yetenek kullanımları azami manayı %10 azaltır. Azami mana en az 10 olabilir." },

        { id: "safakkalkani", name: "Şafak Kalkanı", 
            stats: [ { icon: "[armor]", value: "+50" },{ icon: "[hp]", value: "+200" } ],
            desc: "Kullanıcı her 2.5 saniyede bir 1 hücrelik bir alan içindeki rakiplerden 5 Zırh çalar ve kendi zırhının %15 kadarına eşdeğer miktarda can yeniler.<br><br>Kullanıcı aynı zamanda Alacakaranlık Kalkanı'na da sahipse bu eşyanın etkisi her 1.3 saniyede bir tetiklenir.<br><br><b class='txt-info'>İyileştirme miktarı aşamaya bağlı olarak artar.</br>" },

        { id: "sapkatnektari", name: "Şapkat Nektarı", 
            stats: [ { icon: "[ad]", value: "+25%" },{ icon: "[ap]", value: "+25" },{ icon: "[as]", value: "+20" } ],
            desc: "Kullanıcı her alt etmede bir şapka takar. Taktığı şapka başına %1 Saldırı Gücü ve Yetenek Gücü kazanır. Katledildiğinde şapkalarının %20 kadarını kaybeder<br>(Şapka Sayısı: 0)." },

        { id: "sinsipence", name: "Sinsi Pençe", 
            stats: [ { icon: "[ad]", value: "+35%" },{ icon: "[critchance]", value: "+45" },{ icon: "[hp]", value: "+200" } ],
            desc: "Kullanıcı bir hedefi katlettikten sonra tüm olumsuz etkilerden arınır ve 4 hücrelik bir alan içindeki en uzak hedefe atılır. Sonraki iki kritik vuruşu %50 İlave Kritik Vuruş Hasarı verir." },

        { id: "statikkhancer", name: "Statikk Hançer", 
            stats: [ { icon: "[ap]", value: "+15" },{ icon: "[as]", value: "+50" } ],
            desc: "Her 3. saldırı, 4 rakibe 30 + kullanıcının yetenek gücünün %40 kadarına eşdeğer miktarda fazladan büyü hasarı verir." },

        { id: "tezbicak", name: "Tezbıçak", 
            stats: [ { icon: "[ap]", value: "+10" },{ icon: "[as]", value: "+12" } ],
            desc: "Saldırılar birikecek şekilde %5 Saldırı Hızı sağlar. Her 5 saldırı aynı zamanda %2 Saldırı Gücü ve %2 Yetenek Gücü kazandırır." },

        { id: "ufukgetiren", name: "Ufukgetiren", 
            stats: [ { icon: "[armor]", value: "+20" },{ icon: "[hp]", value: "+250" },{ icon: "[mr]", value: "+20" },{ icon: "[mana]", value: "+2" } ],
            desc: "Kullanıcının sersemlettiği rakiplere yıldırım çarpar. Yıldırım azami canın %30 kadarına eşdeğer miktarda büyü hasarı verir." },

        { id: "ulularintilsimi", name: "Uluarın Tılsımı", 
            stats: [ { icon: "[ad]", value: "+20%" },{ icon: "[ap]", value: "+20" },{ icon: "[amp]", value: "+120" },{ icon: "[hp]", value: "+450" } ],
            desc: "Kullanıcı çatışma başladıktan 22 saniye sonra %100 Azami Can ve çatışmanın geri kalanı boyunca %120 Hasar Artışı kazanır." },

        { id: "yenilmez", name: "Yenilmez", 
            stats: [ { icon: "[mr]", value: "+20" },{ icon: "[ap]", value: "+500" },{ icon: "[mr]", value: "+20" } ],
            desc: "Kullanıcının hareket hızı büyük ölçüde azalır.<br><br>Kullanıcı %12 Azami Can ve sersemletme etkilerine karşı bağışıklık kazanır. Ayrıca mevcut hedefini yakın dövüş menziline çeker." },

        { id: "zhonyanindongusu", name: "Zhonya'nın Döngüsü", 
            stats: [ { icon: "[ap]", value: "+25" },{ icon: "[armor]", value: "+25" },{ icon: "[mr]", value: "+25" } ],
            desc: "Çatışmada Bir Kez: Kullanıcı, canı %40 değerine düştüğünde 3 saniyeliğine hasar görmez ve hedef alınamaz hale gelir.<br><br><b class='txt-info'>Özel - şampiyon başına sadece bir adet</b>" }
        ]
    },

    radiant: {
        title: "Işıltılı Eşya",
        items: [
        { id: "radadaletineli", name: "Işıltılı Adaletin Eli",
            stats: [ { icon: "[critchance]", value: "+40" }, { icon: "[mana]", value: "+2" } ],
            desc: "Kullanıcı 2 etki kazanır:<br><b class='txt-rad'>%30</b> Saldırı Gücü ve <b class='txt-rad'>%30</b> Yetenek Gücü<br><b class='txt-rad'>%24</b> Mutlak Sömürü" },

        { id: "radbasmelekasasi", name: "Işıltılı Başmelek Asası",
            stats: [ { icon: "[ap]", value: "+60" }, { icon: "[mana]", value: "+2" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı çatışmadayken 5 saniyede bir <b class='txt-rad'>%40</b> Yetenek Gücü kazanır." },

        { id: "radciva", name: "Işıltılı Cıva",
            stats: [ { icon: "[as]", value: "+30" }, { icon: "[critchance]", value: "+40" },{ icon: "[mr]", value: "+40" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı <b class='txt-rad'>45</b> saniyeliğine kitle kontrolü etkilerine karşı bağışıklık kazanır.<br><br>Kullanıcı her saniye birikecek şekilde <b class='txt-rad'>%6</b> Saldırı Hızı kazanır." },

        { id: "raddegiskenmigfer", name: "Işıltılı Değişken Miğfer",
            stats: [ { icon: "[mr]", value: "+40" }, { icon: "[mana]", value: "+6" } ],
            desc: "Kullanıcı tüm kaynaklardan fazladan <b class='txt-rad'>%30</b> Mana kazanır. Ayrıca kullanıcı rolüne bağlı olarak fazladan bir ilave kazanır:<br><br>Tank veya Dövüşçü: <b class='txt-rad'>100</b> Zırh ve Büyü Direnci kazanır.<br><br>Nişancı veya Sahir: <b class='txt-rad'>25</b> Saldırı Gücü ve Yetenek Gücü kazanır." },

        { id: "raddengeortusu", name: "Işıltılı Denge Örtüsü",
            stats: [ { icon: "[hp]", value: "+500" }, { icon: "[mr]", value: "+40" } ],
            desc: "Kullanıcı 3 hücrelik bir alan içindeki rakipleri %30 <b class='txt-bold'>aşındırır</b> ve <b class='txt-rad'>ilk 20 saniyesi</b> boyunca <b class='txt-rad'>50</b> Zırh ve Büyü Direnci kazanır.<br><br><b class='txt-info'>Aşındırma: Aşındırılan birimlerin zırhı azalır.</b>" },

        { id: "raddevkatili", name: "Işıltılı Dev Katili",
            stats: [ { icon: "[ad]", value: "+30%" }, { icon: "[ap]", value: "+30" }, { icon: "[as]", value: "+30" }, { icon: "[amp]", value: "+30%" } ],
            desc: "Kullanıcı tanklara karşı fazladan <b class='txt-rad'>%30</b> Hasar Artışı kazanır." },

        { id: "raddikenliyelek", name: "Işıltılı Dikenli Yelek",
            stats: [ { icon: "[armor]", value: "+130" } ],
            desc: "Kullanıcı <b class='txt-rad'>%18</b> Azami Can kazanır.<br><br>Kullanıcı saldırılardan <b class='txt-rad'>%10</b> daha az hasar alır. Bir saldırıdan isabet aldığında bitişiğindeki tüm rakiplere <b class='txt-rad'>200</b> Büyü Hasarı verir.<br><br><b class='txt-info'>Bu etkinin 2 saniyelik bir bekleme süresi vardır.</b>" },

        { id: "radebedikilic", name: "Işıltılı Ebedi Kılıç",
            stats: [ { icon: "[ad]", value: "+75%" }, { icon: "[critchance]", value: "+75" } ],
            desc: "Kullanıcı yeteneğiyle kritik vuruş yapabilir.<br><br>Kullanıcı halihazırda yeteneğiyle kritik vuruş yapabiliyorsa bunun yerine %10 Kritik Vuruş Hasarı kazanır." },

        { id: "radejderpencesi", name: "Işıltılı Ejder Pençesi",
            stats: [ { icon: "[mr]", value: "+150" } ],
            desc: "Kullanıcı <b class='txt-rad'>%22</b> Azami Can kazanır.<br><br>Kullanıcı 2 saniyede bir azami canının <b class='txt-rad'>%5</b> kadarını yeniler." },

        { id: "radgargoyltaszirhi", name: "Işıltılı Gargoyl Taş Zırhı",
            stats: [ { icon: "[armor]", value: "+50" }, { icon: "[hp]", value: "+250" }, { icon: "[mr]", value: "+50" } ],
            desc: "Kullanıcı onu hedef alan her rakip başına <b class='txt-rad'>25</b> Zırh ve <b class='txt-rad'>25</b> Büyü Direnci kazanır." },

        { id: "radgeceninkiyisi", name: "Işıltılı Gecenin Kıyısı",
            stats: [ { icon: "[ad]", value: "+30%" }, { icon: "[ap]", value: "+30" },{ icon: "[as]", value: "+30" }, { icon: "[armor]", value: "+40" } ],
            desc: "Kullanıcı canı %60 değerine düştüğünde kısa süreliğine hedef alınamaz hale gelir, tüm olumsuz etkilerden arınır ve <b class='txt-rad'>eksik canının tamamını yeniler</b>." },

        { id: "radguinsoonunhiddeti", name: "Işıltılı Guinsoo'nun Hiddeti",
            stats: [ { icon: "[ap]", value: "+20" }, { icon: "[as]", value: "+20" } ],
            desc: "Kullanıcı her saniye birikecek şekilde <b class='txt-rad'>%14</b> Saldırı Hızı kazanır." },

        { id: "radgunatesi", name: "Işıltılı Günateşi Pelerini",
            stats: [ { icon: "[armor]", value: "+40" }, { icon: "[hp]", value: "+300" } ],
            desc: "Kullanıcı <b class='txt-rad'>%16</b> Azami Can kazanır.<br><br>Kullanıcı 2 saniyede bir 2 hücrelik bir alan içindeki bir rakibi 10 saniye boyunca <b class='txt-rad'>%2</b> <b class='txt-bold'>yakar</b> ve %33 <b class='txt-bold'>yaralar</b>.<br><br><b class='txt-info'>Yakma: Yanan birimler her saniye azami canlarının belli bir oranına eşdeğer miktarda gerçek hasar alır.<br>Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</b>" },

        { id: "radhextechsilahkilic", name: "Işıltılı Hextech Silahkılıç",
            stats: [ { icon: "[ad]", value: "+40%" }, { icon: "[ap]", value: "+40" }, { icon: "[mana]", value: "+2" }, { icon: "[sv]", value: "+30" } ],
            desc: "Kullanıcı yüzdelik canı en düşük takım arkadaşını verdiği hasarın <b class='txt-rad'>%40</b> kadarına eşdeğer miktarda iyileştirir.<br><br>Takım Arkadaşlarına Yönelik İyileştirme: 0" },

        { id: "radhiclikdegnegi", name: "Işıltılı Hiçlik Değneği",
            stats: [ { icon: "[ap]", value: "+75" }, { icon: "[as]", value: "+30" }, { icon: "[mana]", value: "+2" } ],
            desc: "Kullanıcı saldırı ve yetenekleriyle hasar verdiğinde hedefi <b class='txt-rad'>çatışmanın geri kalanı</b> boyunca %30 <b class='txt-bold'>örseler</b>. Bu etki birikmez.<br><br><b class='txt-info'>Örseleme: Örselenen birimlerin büyü direnci azalır.</b>" },

        { id: "radhirsizeldiveni", name: "Işıltılı Hırsız Eldiveni",
            stats: [ { icon: "[critchance]", value: "+20" }, { icon: "[hp]", value: "+150" } ],
            desc: "Her Tur: Kullanıcı rasgele 2 <b class='txt-rad'>ışıltılı</b> eşya kazanır.<br><br><b class='txt-info'>3 eşya yuvası kullanır.</b>" },

        { id: "radhucumgurzu", name: "Işıltılı Hücum Gürzü",
            stats: [ { icon: "[as]", value: "+20" }, { icon: "[amp]", value: "+10%" }, { icon: "[critchance]", value: "+40" }, { icon: "[hp]", value: "+300" } ],
            desc: "Kritik vuruşlar 5 saniyeliğine <b class='txt-rad'>%10</b> Hasar Artışı kazandırır. Bu ilave en fazla 4 defa birikir." },

        { id: "radiyonkivilcimi", name: "Işıltılı İyon Kıvılcımı",
            stats: [ { icon: "[ap]", value: "+30" }, { icon: "[hp]", value: "+500" }, { icon: "[mr]", value: "+70" } ],
            desc: "Kullanıcı 2 hücrelik bir alan içindeki rakipleri %30 <b class='txt-bold'>örseler</b>. Bu rakipler yetenek kullandıklarında harcadıkları mananın <b class='txt-rad'>%300</b> kadarına eşdeğer miktarda büyü hasarı alır.<br><br><b class='txt-uniq'>Doğrudan hasar eşyası</b><br><b class='txt-info'>Örseleme: Örselenen birimlerin büyü direnci azalır.</b>" },

        { id: "radkanasusamis", name: "Işıltılı Kanasusamış",
            stats: [ { icon: "[ad]", value: "+30%" }, { icon: "[ap]", value: "+30" }, { icon: "[mr]", value: "+40" }, { icon: "[sv]", value: "+40" } ],
            desc: "Çatışmada Bir Kez: Kullanıcı canı %40 değerine düştüğünde en fazla 5 saniyeliğine azami canının <b class='txt-rad'>%50</b> kadarına eşdeğer miktarda kalkan kazanır." },

        { id: "radkararliyurek", name: "Işıltılı Kararlı Yürek",
            stats: [ { icon: "[mr]", value: "+40" }, { icon: "[critchance]", value: "+40" }, { icon: "[hp]", value: "+600" } ],
            desc: "Kullanıcı <b class='txt-rad'>%20</b> Dayanıklılık kazanır. Canı %50 değerinin üstündeyken <b class='txt-rad'>%36</b> Dayanıklılık kazanır." },

        { id: "radkirmiziguclendirme", name: "Işıltılı Kırmızı Güçlendirme",
            stats: [ { icon: "[as]", value: "+90" }, { icon: "[amp]", value: "+6%" } ],
            desc: "Kullanıcının yeteneği ve saldırıları rakipleri 5 saniyeliğine <b class='txt-rad'>%2</b> <b class='txt-bold'>yakar</b> ve %33<b class='txt-bold'> yaralar</c>.<br><br><b class='txt-info'>Yakma: Yanan birimler her saniye azami canlarının belli bir oranına eşdeğer miktarda gerçek hasar alır.<br>Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</b>" },

        { id: "radkrakeninofkesi", name: "Işıltılı Krakenin Öfkesi",
            stats: [ { icon: "[ad]", value: "+20%" }, { icon: "[ap]", value: "+20" }, { icon: "[mr]", value: "+40" } ],
            desc: "Kullanıcının saldırıları birikecek şekilde <b class='txt-rad'>%7</b> Saldırı Gücü sağlar. En fazla 15 kez birikebilir. Kullanıcı 15 saldırı yaptıktan sonra <b class='txt-rad'>%60</b> Saldırı Hızı kazanır." },

        { id: "radkraliyetbasligi", name: "Işıltılı Kraliyet Başlığı",
            stats: [ { icon: "[ap]", value: "+40" }, { icon: "[armor]", value: "+40" }, { icon: "[hp]", value: "+200" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı, 8 saniyeliğine azami canının <b class='txt-rad'>%50</b> kadarına eşdeğer miktarda kalkan kazanır.<br><br>Kullanıcı kalkanın süresi dolduğunda <b class='txt-rad'>%50 Yetenek Gücü</b> kazanır." },

        { id: "radmaviguclendirme", name: "Işıltılı Mavi Güçlendirme",
            stats: [ { icon: "[ad]", value: "+30%" }, { icon: "[ap]", value: "+30" }, { icon: "[mana]", value: "+10" } ],
            desc: "Kullanıcı tüm kaynaklardan fazladan <b class='txt-rad'>%20</b> Saldırı Gücü ve Yetenek Gücü kazanır." },

        { id: "radmorellonomikon", name: "Işıltılı Morellonomikon",
            stats: [ { icon: "[ap]", value: "+40" }, { icon: "[hp]", value: "+300" }, { icon: "[mana]", value: "+2" } ],
            desc: "Kullanıcının yeteneği ve saldırıları rakipleri 10 saniyeliğine<b class='txt-rad'>%2</b> <b class='txt-bold'>yakar</b> ve %33 <b class='txt-bold'>yaralar</b>.<br><br><b class='txt-info'>Yakma: Yanan birimler her saniye azami canlarının belli bir oranına eşdeğer miktarda gerçek hasar alır.<br>Yara: Yaralanan birimlerin aldığı iyileştirme etkileri azalır.</b>" },

        { id: "radmuhafizinadagi", name: "Işıltılı Muhafızın Adağı",
            stats: [ { icon: "[armor]", value: "+20%" }, { icon: "[mr]", value: "+20" }, { icon: "[mana]", value: "+2" } ],
            desc: "Çatışma Başlangıcında: Kullanıcı <b class='txt-rad'>%40</b> Mana kazanır.<br><br>Kullanıcı, canı %40 değerine düştüğünde <b class='txt-rad'>%30 Mana</b> ve <b class='txt-rad'>azami canının %40</b> kadarına eşdeğer miktarda kalkan kazanır." },

        { id: "radmucevherlieldiven", name: "Işıltılı Mücevherli Eldiven",
            stats: [ { icon: "[ap]", value: "+75" }, { icon: "[critchance]", value: "+75" } ],
            desc: "Kullanıcı yeteneğiyle kritik vuruş yapabilir.<br><br>Kullanıcı halihazırda yeteneğiyle kritik vuruş yapabiliyorsa bunun yerine %10 Kritik Vuruş Hasarı kazanır." },

        { id: "radnashorundisi", name: "Işıltılı Nashor'un Dişi",
            stats: [ { icon: "[ap]", value: "+30" }, { icon: "[as]", value: "+20" }, { icon: "[critchance]", value: "+40" }, { icon: "[hp]", value: "+300" } ],
            desc: "Kullanıcının saldırıları <b class='txt-rad'>4</b> İlave Mana yeniler. Kritik vuruş yaparsa bu ilave artarak <b class='txt-rad'>8</b> olur." },

        { id: "radolumkilici", name: "Işıltılı Ölüm Kılıcı",
            stats: [ { icon: "[ad]", value: "+110%" }, { icon: "[amp]", value: "+20%" } ],
            desc: "<b class='txt-info'>Rakip görse de parlar, dost görse de. Hatta canlı herhangi bir şey olması yeterli.</b>" },

        { id: "radrabadonunsapkasi", name: "Işıltılı Rabadon'un Şapkası",
            stats: [ { icon: "[ap]", value: "+100" }, { icon: "[amp]", value: "+50" } ],
            desc: "<b class='txt-info'>Yeri geldi mucizelere, yeri geldi musibetlere yol açtı.</b>" },

        { id: "radruhgomlegi", name: "Işıltılı Ruh Gömleği",
            stats: [ { icon: "[hp]", value: "+700" }, { icon: "[mana]", value: "+4" }, { icon: "[dr]", value: "+20%" } ],
            desc: "Kullanıcı her saniye eksik canının <b class='txt-rad'>%5</b> kadarını yeniler." },

        { id: "radshojininmizragi", name: "Işıltılı Shojin'in Mızrağı",
            stats: [ { icon: "[ad]", value: "+30%" }, { icon: "[ap]", value: "+30" }, { icon: "[mana]", value: "+2" } ],
            desc: "Saldırılar <b class='txt-rad'>fazladan 10 Mana yeniler.</b>" },

        { id: "radsonfisilti", name: "Işıltılı Son Fısıltı",
            stats: [ { icon: "[ad]", value: "+45%" }, { icon: "[as]", value: "+40" }, { icon: "[critchance]", value: "+40" } ],
            desc: "Kullanıcı saldırı ve yetenekleriyle hasar verdiğinde hedefi <b class='txt-rad'>çatışmanın geri kalanı</b> boyunca %30 <b class='txt-bold'>aşındırır</b>. Bu etki birikmez.<br><br><b class='txt-info'>Aşındırma: Aşındırılan birimlerin zırhı azalır.</b>" },
        
            { id: "radsterakinguvencesi", name: "Işıltılı Sterak'ın Güvencesi",
            stats: [ { icon: "[ad]", value: "+80%" }, { icon: "[hp]", value: "+600" }, ],
            desc: "Kullanıcı canı %60 değerine düştüğünde azami canının <b class='txt-rad'>%100</b> kadarına eşdeğer miktarda kalkan kazanır. Kalkan <b class='txt-rad'>6</b> saniye içinde hızla azalarak kaybolur." },

        { id: "radtitaninazmi", name: "Işıltılı Titanın Azmi",
            stats: [ { icon: "[as]", value: "+20" }, { icon: "[armor]", value: "+40" } ],
            desc: "Kullanıcı saldırırken veya hasar alırken en fazla 25 kez birikecek şekilde <b class='txt-rad'>%4</b> Saldırı Gücü ve <b class='txt-rad'>%4</b> Yetenek Gücü kazanır." },

        { id: "radwarmogunzirhi", name: "Işıltılı Warmog'un Zırhı",
            stats: [ { icon: "[hp]", value: "+1200" } ],
            desc: "Kullanıcı <c class='txt-rad'>%33</c> Azami Can kazanır." }
        ]
    },

    emblem: {
    title: "Amblemler",
        items: [
        { id: "atik", name: "Atik Amblemi", 
            components: ["tava", "nisanciyayi"],
            stats: [ { icon: "[as]", value: "+10" }, ],
            desc: "Kullanıcı Atik özelliği kazanır.<br><br>Ayrıca bir rakibi alt ettiğinde en yakınındaki hedefe atılarak azami canının %10 kadarını yeniler." },

        { id: "bilgewater", name: "Bilgewater Amblemi", 
            components: ["spatula", "tanricaningozyasi"],
            stats: [ { icon: "[mana]", value: "+1" } ],
            desc: "Kullanıcı Bilgewater özelliği kazanır." },

        { id: "bicici", name: "Biçici Amblemi",
            components: ["tava", "tekkilici"],
            stats: [ { icon: "[ad]", value: "+10%" } ],
            desc: "Kullanıcı Biçici özelliği kazanır.<br><br>Ayrıca azami canı %25 değerinin altına düştüğünde 20 Mana ve azami canının %15 kadarına eşdeğer miktarda kalkan kazanır." },

        { id: "bozguncu", name: "Bozguncu Amblemi", 
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Bozguncu özelliği kazanır.<br><br>Ayrıca yetenekleri 3 saniye içinde %30 İlave Büyü Hasarı verir." },

        { id: "demacia", name: "Demacia Amblemi", 
            components: ["spatula", "zinciryelek"],
            stats: [ { icon: "[armor]", value: "+20" } ],
            desc: "Kullanıcı Demacia özelliği kazanır." },

        { id: "ezergecer", name: "Ezergeçer Amblemi", 
            components: ["tava", "negatronpelerini"],
            stats: [ { icon: "[mr]", value: "+20" } ],
            desc: "Kullanıcı Ezergeçer özelliği kazanır.<br><br>Ayrıca kullanıcı, diğer Ezergeçerler katledildiklerinde onların azami canının %10 kadarını kazanır." },

        { id: "freljord", name: "Freljord Amblemi", 
            components: ["spatula", "devkemeri"],
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Freljord özelliği kazanır." },

        { id: "gardiyan", name: "Gardiyan Amblemi", 
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Gardiyan özelliği kazanır.<br><br>Ayrıca kalkanı kırıldığında başlangıçtaki kalkan değerinin %30 kadarına eşdeğer miktarda can yeniler." },

        { id: "hiclik", name: "Hiçlik Amblemi", 
            components: ["spatula", "nisanciyayi"],
            stats: [ { icon: "[as]", value: "+10" } ],
            desc: "Kullanıcı Hiçlik özelliği kazanır." },

        { id: "hisimli", name: "Hışımlı Amblemi", 
            components: ["tava", "idmaneldiveni"],
            stats: [ { icon: "[critchance]", value: "+20" } ],
            desc: "Kullanıcı Hışımlı özelliği kazanır.<br><br>Ayrıca kritik vuruş yaptığında %2 ihtimalle 1 Altın kazandırır.<br><br><b class='txt-info'>Bekleme Süresi: 0.8 saniye</b><br><br><b class='txt-bold'>Bu Oyunda Kazanılan Altın: X</b>" },

        { id: "ionia", name: "Ionia Amblemi", 
            components: ["spatula", "asiribuyuksopa"],
            stats: [ { icon: "[ap]", value: "+10" } ],
            desc: "Kullanıcı Ionia özelliği kazanır." },

        { id: "ixtal", name: "Ixtal Amblemi", 
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Ixtal özelliği kazanır." },

        { id: "kavgaci", name: "Kavgacı Amblemi", 
            components: ["tava", "devkemeri"],
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Kavgacı özelliği kazanır.<br><br>Ayrıca her saniye 1 hücrelik bir alana azami canının %2 kadarına eşdeğer miktarda büyü hasarı verir." },

        { id: "manabaz", name: "Manabaz Amblemi", 
            components: ["tava", "tanricaningozyasi"],
            stats: [ { icon: "[mana]", value: "+1" } ],
            desc: "Kullanıcı Manabaz özelliği kazanır.<br><br>Ayrıca yeteneğini kullandığında harcadığı mananın %20 kadarına eşdeğer miktarda yetenek gücü kazanır." },

        { id: "mesafeci", name: "Mesafeci Amblemi", 
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Mesafeci özelliği kazanır.<br><br>Ayrıca saldırı menzili 1 artar." },

        { id: "noxus", name: "Noxus Amblemi", 
            components: ["spatula", "tekkilici"],
            stats: [ { icon: "[ad]", value: "+10%" } ],
            desc: "Kullanıcı Noxus özelliği kazanır." },

        { id: "pitover", name: "Pitover Amblemi",
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Pitover özelliği kazanır." },

        { id: "savunucu", name: "Savunucu Amblemi", 
            components: ["tava", "zinciryelek"],
            stats: [ { icon: "[armor]", value: "+20" } ],
            desc: "Kullanıcı Savunucu özelliği kazanır.<br><br>Çatışma Başlangıcında: Tüm kaynaklardan %35 daha fazla zırh VEYA büyü direnci kazanır. Kazanacağı nitelik en fazla sahip olduğu niteliğe göre belirlenir." },

        { id: "sihirustadi", name: "Sihir Üstadı Amblemi", 
            components: ["tava", "asiribuyuksopa"],
            stats: [ { icon: "[ap]", value: "+10" } ],
            desc: "Kullanıcı Sihir Üstadı özelliği kazanır.<br><br>Ayrıca bir rakibi katlettiğinde azami manasının %15 kadarını geri kazanır." },

        { id: "silahsor", name: "Silahşor Amblemi",
            stats: [ { icon: "[hp]", value: "+150" } ],
            desc: "Kullanıcı Silahşor özelliği kazanır.<br><br>Ayrıca bir rakibe fiziksel hasar verdiğinde onun zırhını 2 azaltır." },

        { id: "yordle", name: "Yordle Amblemi", 
            components: ["spatula", "negatronpelerini"],
            stats: [ { icon: "[mr]", value: "+20" } ],   
            desc: "Kullanıcı Yordle özelliği kazanır." },

        { id: "zaun", name: "Zaun Amblemi", 
            components: ["spatula", "idmaneldiveni"],
            stats: [ { icon: "[critchance]", value: "+20" } ],
            desc: "Kullanıcı Zaun özelliği kazanır." }
        ]
    },

    special: {
    title: "Özel Eşyalar",
        items: [
        { id: "belalipalasi", name: "Belalı Palası", 
            stats: [ { icon: "[ad]", value: "+20%" }, { icon: "[ap]", value: "+20" }, { icon: "[sv]", value: "+15%" } ],
            desc: "Kullanıcının rakiplere verdiği hasar onlara kanama etkisi uygular ve 4 saniye içinde fazladan %35 Hasar verir.<br><br>Önerilen Kullanıcı: Gangplank" },

        { id: "dayaniklimusta", name: "Dayanıklı Muşta", 
            stats: [ { icon: "[armor]", value: "+35" }, { icon: "[hp]", value: "+300" }, { icon: "[mr]", value: "+35" } ],
            desc: "Kullanıcı, canı %50 değerinin üstündeyken bu eşyadan iki katı zırh ve büyü direnci ilavesi kazanır.<br><br>Ayrıca her 4 saniyede bir en yakınındaki 2 rakibe zırh ve büyü direncinin %50 kadarına eşdeğer miktarda büyü hasarı verir.<br><br>Önerilen Kullanıcı: Nautilus" },

        { id: "ikincikaptanintabancasi", name: "İkinci Kaptanın Tabancası", 
            stats: [ { icon: "[ad]", value: "+10%" }, { icon: "[critchance]", value: "+20" } ],
            desc: "Kullanıcı çatışma esnasında her saniye %3 Saldırı Gücü ve %3 Saldırı Hızı kazanır.<br><br>Önerilen Kullanıcı: Miss Fortune" },

        { id: "kaptanintarifi", name: "Kaptanın Tarifi", 
            stats: [ { icon: "[ad]", value: "+15%" }, { icon: "[ap]", value: "+20" }, { icon: "[hp]", value: "+100" } ],
            desc: "Kullanıcının saldırıları ve yetenekleri rakipleri 3 saniyeliğine <b class='bold'>yakar</b> ve onların buz tutmasına yol açar.<br><br>Önerilen Kullanıcı: Twisted Fate" },

        { id: "karaborsapatlayicilari", name: "Karaborsa Patlayıcıları", 
            stats: [ { icon: "[ap]", value: "+20" }, { icon: "[as]", value: "+10" } ],
            desc: "Kullanıcı mevcut hedefine ve en yakındaki 2 rakibe her 5 saniyede bir 15 + son 5 saniye içinde verdiği hasarın %12 kadarına eşdeğer miktarda büyü hasarı verir.<br><br>Önerilen Kullanıcı: Fizz" },

        { id: "oluadaminhanceri", name: "Ölü Adamın Hançeri", 
            stats: [ { icon: "[ad]", value: "+20%" }, { icon: "[ap]", value: "+20" }, ],
            desc:"Kullanıcının saldırı ve yetenekleri canı %12 değerinin altındaki rakipleri infaz eder. Ayrıca kullanıcı bir rakibi katlettiğinde %15 Saldırı Gücü ve %15 Yetenek Gücü kazanır.<br><br>Önerilen Kullanıcı: Graves" },

        { id: "portakalyigini", name: "Portakal Yığını",
            stats: [ { icon: "[hp]", value: "+600" } ],
            desc: "Kullanıcı 7 saniyede bir azami canının %15 kadarını yeniler ve tüm olumsuz etkilerden arınır. Ayrıca 15 saniyenin ardından 10 [serpents] kazandırır.<br><br>Önerilen Kullanıcı: Illaoi" },

        { id: "sanslipara", name: "Şanslı Para",
            sstats: [ { icon: "[]", value: "+" }, { icon: "[]", value: "+" }, { icon: "[]", value: "+15" } ],
            desc: "Kullanıcı bir rakibi alt ettiğinde fazladan 1 [serpents] kazandırır. (Kazanılan Miktar: 0)<br><br>Önerilen Kullanıcı: Gangplank" }
        ]
    }
};