///////////// TABLE  ////////////////////////////////////////////////////////
///NOT v1: Unutma Görsel CSS Çalışılacak ////////////////////////////////////
///NOT v2: Unutma 2. Sayfada Sütunların kaybolmamasını ekle//////////////////
///NOT v3:                                                 //////////////////
/////////////////////////////////////////////////////////////////////////////
var $table = document.getElementById("tablo"),
// Görüntülenecek Satır Sayısı
$watchNumTotal = 9,
// Tablodaki Satır Sayısını alıyorum
$rowCount = $table.rows.length,
// Ilk satırda tag kontrolü yapıyorum
$firstRow = $table.rows[0].firstElementChild.tagName,
// Tabloda Head row varmı ona bakıyorum
$hasHead = ($firstRow === "th"),
// Satırları tutmak için bir dizi oluşturuyorum
$tr = [],
// Başlık etiketi olan döngü counterlarını 1. satırdan değilse 0. satırdan baslatmak için 
$i,$ii,$j = ($hasHead)?1:0,$th = ($hasHead?$table.rows[(0)].outerHTML:"");
// Tutulan sayfa sayısını alıyorum
var $pageCount = Math.ceil($rowCount / $watchNumTotal);
// Sadece 1 sayfamız varsa hiçbir işlem yapmıyorum
if ($pageCount > 1) {
    // Tablomu olusturacak döngüyü yaratıyorum ve html cıktısını yazıyorum
    for ($i = $j,$ii = 0; $i < $rowCount; $i++, $ii++)
        $tr[$ii] = $table.rows[$i].outerHTML;
    // Oluşturacağım butonlar için bir div olusturuyorum 
    // beforebegin Elemanın kendisinden önce. 
    // afterbegin Öğenin hemen içinde ilk child'dan önce oluşturmak için
    // beforeend Öğenin hemen içinde son child'dan sonra oluşturmak için
    // afterend Öğenin kendisinden sonra olduğu için ardaşık bunu kullandım
    $table.insertAdjacentHTML("afterend","<div id='buttons'></div");
    // İlk sayfa varsayılan olarak gelecek
    sort(1);
}

//seçilen sayfaya göre sort() fonksiyonundaki işlemleri burda oluşturuyorum 
// ve bunları butonların click özellikleriyle kullanıyorum
function sort($selectPage) {
    // for($i; baslangic noktası < Toplamdaki görüntülenecek satır 
    //küçükse olusturdugum her sayfanın ilk satır sayısından tabloya satırları yaziyorum  )
    var $rows = $th,$startPoint = (($watchNumTotal * $selectPage)-$watchNumTotal);
    for ($i = $startPoint; $i < ($startPoint+$watchNumTotal) && $i < $tr.length; $i++)
        $rows += $tr[$i];
    //Burada elimde artık satırlar oluştu
    $table.innerHTML = $rows;
    // Sayfaların butonlarını ekliyorum ve seçili sayfayı active classı ile boyuyorum
    document.getElementById("buttons").innerHTML = pageButtons($pageCount,$selectPage);
    document.getElementById("id"+$selectPage).setAttribute("class","active");
}

//Butonları oluşurmam için kaç sayfam olduğunu ve
// ($pCount)Sayfa Sayısı,($cur)Seçilmiş olan
function pageButtons($pCount,$cur) {
    // < > Butonları ilk sayfada ve son sayfada kullanıma kapatıyorum
    var $prevDis = ($cur == 1)?"disabled":"",
        $nextDis = ($cur == $pCount)?"disabled":"",
        //Tüm butonları oluşturup onclick özelliklerini oluşturuyorum 
        // < butonu seçili sayfadan -1 , > butonu +1 diger butonlarda id ile sort() fonksiyonunu kullanıyorum 
        $buttons = "<input type='button' value='<' onclick='sort("+($cur - 1)+")' "+$prevDis+">";
    for ($i=1; $i<=$pCount;$i++){
        $buttons += "<input type='button' id='id"+$i+"'value='"+$i+"' onclick='sort("+$i+")'>";
    }
    $buttons += "<input type='button' value='>' onclick='sort("+($cur + 1)+")' "+$nextDis+">";
    return $buttons;
}