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

            { id: "devkatili", name: "Dev Katili", desc: "Yüksek canlı rakiplere karşı verilen hasarı artırır." },

            { id: "dikenliyelek", name: "Dikenli Yelek", desc: "Zırh sağlar ve alınan kritik vuruş hasarını azaltır." },

            { id: "ebedikilic", name: "Ebedi Kılıç", desc: "Kritik Vuruş Şansı ve Saldırı Gücü sağlar." },

            { id: "ejderpencesi", name: "Ejder Pençesi", desc: "Yüksek büyü direnci ve can yenileme sağlar." },

            { id: "gargoyltaszirhi", name: "Gargoyl Taşzırhı", desc: "Saldırıya uğradığında direnç kazanır." },

            { id: "geceninkiyisi", name: "Gecenin Kıyısı", desc: "Can azaldığında kısa süreli gizlenme ve hız kazanır." },

            { id: "guinsoonunhiddeti", name: "Guinsoo'nun Hiddeti", desc: "Saldırılar sınırsız saldırı hızı biriktirir." },

            { id: "gunatesipelerini", name: "Günateşi Pelerini", desc: "Yakındaki rakipleri yakarak canlarını azaltır." },

            { id: "hextechsilahkilic", name: "Hextech Silahkılıç", desc: "Mutlak sömürü ve en düşük canlı takım arkadaşını iyileştirme." },
            { id: "hiclikdegnegi", name: "Hiçlik Değneği", desc: "Yeteneklerin büyü direncini yok saymasını sağlar." },
            { id: "hirsizeldiveni", name: "Hırsız Eldiveni", desc: "Her tur iki geçici eşya kazandırır." },
            { id: "hucumgurzu", name: "Hücum Gürzü", desc: "Kalkanlı rakiplere daha fazla hasar verir." },
            { id: "iyonkivilcimi", name: "İyon Kıvılcımı", desc: "Büyü direnci kırar ve büyü yapan rakiplere hasar verir." },
            { id: "kanasusamis", name: "Kanasusamış", desc: "Mutlak Sömürü ve can azaldığında kalkan sağlar." },
            { id: "kararliyurek", name: "Kararlı Yürek", desc: "Alınan hasarı azaltır, can yüksekse daha fazla azaltır." },
            { id: "kirmiziguclendirme", name: "Kırmızı Güçlendirme", desc: "Saldırı hızı ve rakipleri yakma etkisi sağlar." },
            { id: "krakeninofkesi", name: "Kraken'in Öfkesi", desc: "Her üçüncü saldırı ilave hasar verir." },
            { id: "kraliyetbasligi", name: "Kraliyet Başlığı", desc: "Çatışma başında kalkan ve Yetenek Gücü kazandırır." },
            { id: "maviguclendirme", name: "Mavi Güçlendirme", desc: "Azami manayı azaltır ve yetenek sonrası mana verir." },
            { id: "morellonomikon", name: "Morellonomikon", desc: "Yetenek hasarı rakipleri yakar ve iyileşmeyi azaltır." },
            { id: "muhafizinadagi", name: "Muhafızın Adağı", desc: "Can azaldığında takım arkadaşlarına kalkan ve direnç sağlar." },
            { id: "mucevherlieldiven", name: "Mücevherli Eldiven", desc: "Yeteneklerin kritik vuruş yapabilmesini sağlar." },
            { id: "nashorundisi", name: "Nashor'un Dişi", desc: "Yetenek kullandıktan sonra büyük bir saldırı hızı artışı verir." },
            { id: "olumkilici", name: "Ölüm Kılıcı", desc: "Saf ve yüksek miktarda Saldırı Gücü kazandırır." },
            { id: "rabadonunsapkasi", name: "Rabadon'un Şapkası", desc: "Çok yüksek miktarda Yetenek Gücü sağlar." },
            { id: "ruhgomlegi", name: "Ruh Gömleği", desc: "Sürekli can yenilemesi sağlar." },
            { id: "shojininmizragi", name: "Shojin'in Mızrağı", desc: "Saldırı başına ek mana kazandırır." },
            { id: "sonfisilti", name: "Son Fısıltı", desc: "Kritik vuruşlar rakibin zırhını büyük oranda kırar." },
            { id: "sterakinguvencesi", name: "Sterak'ın Güvencesi", desc: "Can azaldığında boyut büyür ve SG kazanır." },
            { id: "titaninazmi", name: "Titanın Azmi", desc: "Hasar aldıkça ve verdikçe direnç ve güç biriktirir." },
            { id: "warmogunzirhi", name: "Warmog'un Zırhı", desc: "Dehşet verici miktarda ilave can sağlar." }
        ]
    },

        artifact: {
        title: "Yadigar Eşya",
        items: [
            { id: "aklinsonu", name: "Aklın Sonu", desc: "Saldırı hızı ve büyü direnci sağlar, vuruşlar ek hasar verir." },
            { id: "alacakaranlikkalkani", name: "Alacakaranlık Kalkanı", desc: "Çatışma başında kalkan ve direnç sağlar." },
            { id: "altintoplayici", name: "Altın Toplayıcı", desc: "Düşük canlı rakipleri infaz eder ve altın kazandırır." },
            { id: "bombardimantopu", name: "Bombardıman Topu", desc: "Saldırı menzilini ve saldırı hızını artırır." },
            { id: "cehennematesibaltasi", name: "Cehennem Ateşi Baltası", desc: "Rakipleri yakar ve saldırı gücü kazandırır." },
            { id: "darkinasa", name: "Darkin Asası", desc: "Yetenek gücü ve mutlak sömürü kazandırır." },
            { id: "darkinkalkan", name: "Darkin Kalkanı", desc: "Alınan hasarı azaltır ve savunma güçlendirir." },
            { id: "darkintirpan", name: "Darkin Tırpanı", desc: "Saldırı gücü ve rakiplerden can çalma sağlar." },
            { id: "darkinyay", name: "Darkin Yayı", desc: "Çok yüksek saldırı hızı ve ilave hasar sağlar." },
            { id: "ebedianlasma", name: "Ebedi Anlaşma", desc: "Takım genelinde güçlendirme sağlayan kadim yadigar." },
            { id: "ebedikuvvet", name: "Ebedi Kuvvet", desc: "Saldırı gücünü ve kritik vuruş şansını büyük oranda artırır." },
            { id: "felaketmucevheri", name: "Felaket Mücevheri", desc: "Rakiplerin büyü direncini eritir." },
            { id: "gumusgolsafagi", name: "Gümüşgöl Şafağı", desc: "Kitle kontrole karşı direnç ve saldırı gücü sağlar." },
            { id: "hasmetlihydra", name: "Haşmetli Hydra", desc: "Saldırıların alan hasarı vurmasını sağlar." },
            { id: "hiclikeldiveni", name: "Hiçlik Eldiveni", desc: "Saldırıların kritik vuruş ihtimalini artırır." },
            { id: "kilcik", name: "Kılçık", desc: "Saldırı menzilini iki katına çıkarır ama hızı düşürür." },
            { id: "lichbogan", name: "Lich Boğan", desc: "Yetenek kullandıktan sonraki ilk saldırı büyük hasar verir." },
            { id: "lightshieldarmasi", name: "Lightshield Arması", desc: "Düşük canlı takım arkadaşlarına kalkan sağlar." },
            { id: "ludenincigligi", name: "Luden'in Çığlığı", desc: "Yetenekler rakiplere sıçrayan ek hasar verir." },
            { id: "maceracininpazubendi", name: "Maceracının Pazubendi", desc: "Rakipleri alt ettikçe direnç kazanır." },
            { id: "mogulunzirhi", name: "Mogul'un Zırhı", desc: "Hasar aldıkça biriken devasa can ve zırh sağlar." },
            { id: "olumunisyani", name: "Ölümün İsyanı", desc: "Alınan hasarın bir kısmını zamana yayarak erteler." },
            { id: "omurgaparcalayan", name: "Omurgaparçalayan", desc: "Yalnızken çok yüksek direnç ve saldırı gücü kazanır." },
            { id: "pofudukeldiven", name: "Pofuduk Eldiven", desc: "Kritik şansı verir ve birimi küçülterek hızlandırır." },
            { id: "purdikkatnisanci", name: "Pürdikkat Nişancı", desc: "Uzak mesafedeki rakiplere çok daha fazla hasar verir." },
            { id: "rizikocununbicagi", name: "Rizikocunun Bıçağı", desc: "Saldırı yaparken altın kazanma şansı verir." },
            { id: "safaginozu", name: "Şafağın Özü", desc: "Yüksek yetenek gücü ve mana yenileme sağlar." },
            { id: "safakkalkani", name: "Şafak Kalkanı", desc: "Takım arkadaşlarını koruyan güçlü bir ışık kalkanı." },
            { id: "sapkatnektari", name: "Şapkat Nektarı", desc: "Birimin yetenek gücünü katlayarak artırır." },
            { id: "sinsipence", name: "Sinsi Pençe", desc: "Kritik vuruşlarda rakibin arkasına ışınlanma şansı verir." },
            { id: "statikkhancer", name: "Statikk Hançer", desc: "Her üçüncü saldırıda rakiplere elektrik sıçratır." },
            { id: "tezbicak", name: "Tezbıçak", desc: "Kritik vuruşlar yetenek bekleme süresini azaltır." },
            { id: "ufukgetiren", name: "Ufukgetiren", desc: "Uzak mesafeden yapılan yetenek atışlarını güçlendirir." },
            { id: "ulularintilsimi", name: "Uluarın Tılsımı", desc: "Çatışma uzadıkça birimin gücünü artırır." },
            { id: "yenilmez", name: "Yenilmez", desc: "Çatışma boyunca artan mutlak sömürü ve güç sağlar." },
            { id: "zhonyanindongusu", name: "Zhonya'nın Döngüsü", desc: "Canı kritik seviyeye düştüğünde dokunulmazlık kazanır." }
        ]
    },
        radiant: {
        title: "Işıltılı Eşya",
        items: [
            { id: "radadaletineli", name: "Işıltılı Adaletin Eli", desc: "Çok daha yüksek SG, YG ve Mutlak Sömürü sağlar." },
            { id: "radbasmelekasasi", name: "Işıltılı Başmelek Asası", desc: "Çatışma sırasında çok daha hızlı Yetenek Gücü kazandırır." },
            { id: "radciva", name: "Işıltılı Cıva", desc: "Daha uzun süreli kitle kontrol bağışıklığı ve devasa saldırı hızı." },
            { id: "raddegiskenmigfer", name: "Işıltılı Değişken Miğfer", desc: "Her iki konumda da çok daha güçlü direnç ve mana sağlar." },
            { id: "raddengeortusu", name: "Işıltılı Denge Örtüsü", desc: "Daha geniş bir alandaki rakiplerin zırhını büyük oranda kırar." },
            { id: "raddevkatili", name: "Işıltılı Dev Katili", desc: "Yüksek canlı rakiplere karşı verilen hasarı devasa oranda artırır." },
            { id: "raddikenliyelek", name: "Işıltılı Dikenli Yelek", desc: "Çok yüksek zırh sağlar ve kritik hasarı tamamen etkisizleştirir." },
            { id: "radebedikilic", name: "Işıltılı Ebedi Kılıç", desc: "Muazzam Kritik Vuruş Şansı ve Saldırı Gücü sağlar." },
            { id: "radejderpencesi", name: "Işıltılı Ejder Pençesi", desc: "Sınırsız büyü direnci ve çok güçlü can yenileme." },
            { id: "radgargoyltaszirhi", name: "Işıltılı Gargoyl Taş Zırhı", desc: "Her rakip için kazanılan direnç miktarı çok daha yüksektir." },
            { id: "radgeceninkiyisi", name: "Işıltılı Gecenin Kıyısı", desc: "Gizlenme sırasında kazanılan saldırı hızı ve etkiler artırılmıştır." },
            { id: "radguinsoonunhiddeti", name: "Işıltılı Guinsoo'nun Hiddeti", desc: "Saldırı başına biriken saldırı hızı miktarı çok daha fazladır." },
            { id: "radgunatesi", name: "Işıltılı Günateşi Pelerini", desc: "Daha geniş bir alandaki rakipleri çok daha hızlı yakar." },
            { id: "radhextechsilahkilic", name: "Işıltılı Hextech Silahkılıç", desc: "Çok güçlü Mutlak Sömürü ve devasa takım iyileştirmesi." },
            { id: "radhiclikdegnegi", name: "Işıltılı Hiçlik Değneği", desc: "Rakiplerin büyü direncini neredeyse tamamen yok sayar." },
            { id: "radhirsizeldiveni", name: "Işıltılı Hırsız Eldiveni", desc: "Her tur iki adet rastgele Işıltılı eşya kazandırır." },
            { id: "radhucumgurzu", name: "Işıltılı Hücum Gürzü", desc: "Kalkanlı birimlere karşı verilen hasar bonusu devasadır." },
            { id: "radiyonkivilcimi", name: "Işıltılı İyon Kıvılcımı", desc: "Çok geniş bir alanda büyü direnci kırar ve yıldırım çarpar." },
            { id: "radkanasusamis", name: "Işıltılı Kanasusamış", desc: "Devasa Mutlak Sömürü ve çok güçlü bir can kalkanı." },
            { id: "radkararliyurek", name: "Işıltılı Kararlı Yürek", desc: "Alınan hasarı çok yüksek oranda azaltan kadim zırh." },
            { id: "radkirmiziguclendirme", name: "Işıltılı Kırmızı Güçlendirme", desc: "Çok yüksek saldırı hızı ve durdurulamaz yakma hasarı." },
            { id: "radkrakeninofkesi", name: "Işıltılı Krakenin Öfkesi", desc: "Her üçüncü saldırıda rakiplere dehşet verici hasar vurur." },
            { id: "radkraliyetbasligi", name: "Işıltılı Kraliyet Başlığı", desc: "Çatışma başında devasa kalkan ve Yetenek Gücü." },
            { id: "radmaviguclendirme", name: "Işıltılı Mavi Güçlendirme", desc: "Yetenek sonrası mana iadesi ve hasar artışı devasadır." },
            { id: "radmorellonomikon", name: "Işıltılı Morellonomikon", desc: "Yeteneklerle verilen yakma hasarı ve iyileştirme engeli çok güçlüdür." },
            { id: "radmuhafizinadagi", name: "Işıltılı Muhafızın Adağı", desc: "Takım arkadaşlarına verilen kalkan ve direnç miktarı artırılmıştır." },
            { id: "radmucevherlieldiven", name: "Işıltılı Mücevherli Eldiven", desc: "Yeteneklerin kritik vuruş gücünü devasa oranda artırır." },
            { id: "radnashorundisi", name: "Işıltılı Nashor'un Dişi", desc: "Yetenek sonrası kazanılan saldırı hızı muazzamdır." },
            { id: "radolumkilici", name: "Işıltılı Ölüm Kılıcı", desc: "En yüksek seviyede saf Saldırı Gücü kazandırır." },
            { id: "radrabadonunsapkasi", name: "Işıltılı Rabadon'un Şapkası", desc: "Saf Yetenek Gücü miktarını zirveye taşır." },
            { id: "radruhgomlegi", name: "Işıltılı Ruh Gömleği", desc: "Her saniye devasa miktarda can yenilemesi sağlar." },
            { id: "radshojininmizragi", name: "Işıltılı Shojin'in Mızrağı", desc: "Saldırı başına kazanılan mana miktarı çok yüksektir." },
            { id: "radsonfisilti", name: "Işıltılı Son Fısıltı", desc: "Rakiplerin zırhını neredeyse tamamen parçalar." },
            { id: "radsterakinguvencesi", name: "Işıltılı Sterak'ın Güvencesi", desc: "Can azaldığında devasa boyut, can ve SG artışı sağlar." },
            { id: "radtitaninazmi", name: "Işıltılı Titanın Azmi", desc: "Biriken direnç ve güç miktarı maksimum seviyededir." },
            { id: "radwarmogunzirhi", name: "Işıltılı Warmog'un Zırhı", desc: "Mümkün olan en yüksek can artışını sağlar." }     
        ]
    },

        emblem: {
        title: "Amblemler",
        items: [
            { id: "atik", name: "Atik Amblemi", desc: "Bu birime Atik özelliği kazandırır." },
            { id: "bilgewater", name: "Bilgewater Amblemi", desc: "Bu birime Bilgewater özelliği kazandırır." },
            { id: "bicici", name: "Biçici Amblemi", desc: "Bu birime Biçici özelliği kazandırır." },
            { id: "bozguncu", name: "Bozguncu Amblemi", desc: "Bu birime Bozguncu özelliği kazandırır." },
            { id: "demacia", name: "Demacia Amblemi", desc: "Bu birime Demacia özelliği kazandırır." },
            { id: "ezergecer", name: "Ezergeçer Amblemi", desc: "Bu birime Ezergeçer özelliği kazandırır." },
            { id: "freljord", name: "Freljord Amblemi", desc: "Bu birime Freljord özelliği kazandırır." },
            { id: "gardiyan", name: "Gardiyan Amblemi", desc: "Bu birime Gardiyan özelliği kazandırır." },
            { id: "hiclik", name: "Hiçlik Amblemi", desc: "Bu birime Hiçlik özelliği kazandırır." },
            { id: "hisimli", name: "Hışımlı Amblemi", desc: "Bu birime Hışımlı özelliği kazandırır." },
            { id: "ionia", name: "Ionia Amblemi", desc: "Bu birime Ionia özelliği kazandırır." },
            { id: "ixtal", name: "Ixtal Amblemi", desc: "Bu birime Ixtal özelliği kazandırır." },
            { id: "kavgaci", name: "Kavgacı Amblemi", desc: "Bu birime Kavgacı özelliği kazandırır." },
            { id: "manabaz", name: "Manabaz Amblemi", desc: "Bu birime Manabaz özelliği kazandırır." },
            { id: "mesafeci", name: "Mesafeci Amblemi", desc: "Bu birime Mesafeci özelliği kazandırır." },
            { id: "noxus", name: "Noxus Amblemi", desc: "Bu birime Noxus özelliği kazandırır." },
            { id: "pitover", name: "Pitover Amblemi", desc: "Bu birime Pitover özelliği kazandırır." },
            { id: "savunucu", name: "Savunucu Amblemi", desc: "Bu birime Savunucu özelliği kazandırır." },
            { id: "sihirustadi", name: "Sihir Üstadı Amblemi", desc: "Bu birime Sihir Üstadı özelliği kazandırır." },
            { id: "silahsor", name: "Silahşor Amblemi", desc: "Bu birime Silahşor özelliği kazandırır." },
            { id: "yordle", name: "Yordle Amblemi", desc: "Bu birime Yordle özelliği kazandırır." },
            { id: "zaun", name: "Zaun Amblemi", desc: "Bu birime Zaun özelliği kazandırır." }
        ]
    },

        special: {
        title: "Özel Eşyalar",
        items: [
            { id: "belalipalasi", name: "Belalı Palası", desc: "Özel bir saldırı gücü ve hız takviyesi sağlar." },
            { id: "dayaniklimusta", name: "Dayanıklı Muşta", desc: "Birimin savunma direncini ve canını artırır." },
            { id: "ikincikaptanintabancasi", name: "İkinci Kaptanın Tabancası", desc: "Menzilli saldırılarda ek hasar ve kritik vuruş şansı sağlar." },
            { id: "kaptanintarifi", name: "Kaptanın Tarifi", desc: "Takım arkadaşlarına can veya mana yenileme desteği verir." },
            { id: "karaborsapatlayicilari", name: "Karaborsa Patlayıcıları", desc: "Rakiplere alan hasarı veren patlayıcı etkiler bırakır." },
            { id: "oluadaminhanceri", name: "Ölü Adamın Hançeri", desc: "Saldırı hızı ve rakibin arkasına sızma yeteneği sağlar." },
            { id: "portakalyigini", name: "Portakal Yığını", desc: "Birimin üzerindeki kitle kontrol etkilerini temizler ve iyileştirir." },
            { id: "sanslipara", name: "Şanslı Para", desc: "Çatışma sırasında veya sonunda ek altın kazanma şansı verir." }
        ]
    }
};
