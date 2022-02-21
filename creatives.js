const fetchUrl = "https://random-flat-colors.vercel.app/api/random?count=5";
var CreativeNotes = document.querySelector(".Creative-Notes");
var RightDrawer = document.querySelector(".Right-Drawer");
var AddButton = document.querySelector(".AddBtn");

var Title = document.querySelector(".input-box1");
var SubTitle = document.querySelector(".input-box2");
var ApiColor = document.querySelector(".api-colors");
var ApiColor2 = document.querySelector(".api-colors2");
var Range = document.querySelector(".Range");
var UpdateRange = document.querySelector(".Update-Range");
var NotesData = document.querySelector(".note_data")
var set_colour = "";
var fil_Color = "";


function OpenDrawer(){
    RightDrawer.style.display="flex";
    AddButton.setAttribute("disabled",true);

}

function CloseDrawer(){
    RightDrawer.style.display="none";
    AddButton.removeAttribute("disabled");
}
var Count = 0;
function DoneDrawer(){
    //console.log(DoneDrawer);
    if(Count<5 && (Title.value!="" && SubTitle.value!="") )
    {
   
        RightDrawer.style.display="none";
        AddButton.removeAttribute("disabled");
        
        CreativeNotes.innerHTML+=`<div class="note_data" style="background-color:${set_colour}">
                                        <h2>${Title.value}</h2>
                                        <p>${SubTitle.value}</p>
                                    </div>`;
      Count++;
     Range.value = Count;
     UpdateRange.innerText = Count;
     console.log(Range.value);
    }
    else 
    {
        if(Title.value=="" && SubTitle.value=="")
        {
            document.getElementById("a-error").innerText="Requeired Field";
            document.getElementById("b-error").innerText="Requeired Field";
        }
        else if(Title.value=="")
        document.getElementById("a-error").innerText="Requeired Field";
        else
        document.getElementById("b-error").innerText="Requeired Field";
    }
}



function setColor(color,n){
    //alert(color);
    const SelectColor = document.querySelectorAll(".ColorRound2");
    set_colour=color;
    //console.log(SelectColor);
    for(var i=0;i<SelectColor.length;i++)
    {
        if(i==n)
        SelectColor[i].classList.add("colour_sel");
        else
        SelectColor[i].classList.remove("colour_sel");
    }
}

function SearchFilter(){
    let Search = document.querySelector(".input-box").value;
    const Notes=document.querySelectorAll(".note_data");

     for(var i=0; i<Notes.length; i++){
        //console.log(Notes[i].toString());
        //var obj  = JSON.parse(Notes[i]);
        
        if(Notes[i].innerHTML.includes(Search)){
            //let textvalue =NotesData.textContent || NotesData.innerHTML;
            
                Notes[i].style.display= "";
            }else{
                Notes[i].style.display= "none";
            }
        }
    // }
}

function filterColor(clr){
    
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
      
     const clrs=hexToRgb(clr);
     const rgbClr=`rgb(${clrs.r}, ${clrs.g}, ${clrs.b})`;

     console.log(rgbClr);
    const Notes=document.querySelectorAll(".note_data");

     for(var i=0; i<Notes.length; i++){
         const color=Notes[i].style.backgroundColor;
        if(rgbClr===color){
            Notes[i].style.display= "";
            }else{
                Notes[i].style.display= "none";
            }
         }
        
}

async function GetColor(){
    var RandomColor = await fetch(fetchUrl);
    data = await RandomColor.json();
    //console.log(data);
    for(let i=0;i<data.colors.length;i++){
        ApiColor2.innerHTML+=`<div class="ColorRound2" onclick=setColor("${data.colors[i]}",${i}) style="background-color: ${data.colors[i]}"></div>`
        ApiColor.innerHTML+=`<div class="ColorRound" onclick=filterColor("${data.colors[i]}",${i}) style="background-color: ${data.colors[i]}"></div>`
    }
}GetColor();

