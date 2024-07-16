document.addEventListener("DOMContentLoaded", function () {
    //파일찾기
    const uploadFiles = document.querySelectorAll(".fileBox .uploadBtn");
    uploadFiles.forEach(function(uploadFile,idx){
        uploadFile.addEventListener("change",function(event){
            const fileBox = parentsElementFind(this, "fileBox");
            let fileName;
            if(window.FileReader){
                fileName = this.files[0].name;
                console.log(fileName);
            } else {
                console.log("noFileReader");
                //var filename = $(this).val().split('/').pop().split('\\').pop();
                //var filename = this.val().split('/').pop().split('\\').pop();
            }
            fileBox.querySelector(".textBox").innerText = fileName;
            fileBox.classList.add("on");
        });
    });
    //파일찾기 취소
    const delFiles = document.querySelectorAll(".fileBox .fileDel");
    delFiles.forEach(function(delFile,idx){
        delFile.addEventListener("click",function(event){
            const fileBox = parentsElementFind(this, "fileBox");
            fileBox.querySelector(".uploadBtn").value = "";
            fileBox.querySelector(".textBox").innerText = "";
            fileBox.classList.remove("on");
        });
    });

    //팝업 내부 스크롤 시 타이틀 쉐도우 추가
    const scrollPops = document.querySelectorAll(".modPopup .popCont");
    scrollPops.forEach(function(scrollPop, idx){
        scrollPop.addEventListener("scroll",function(event){
            if(this.scrollTop >= 1){
                this.previousElementSibling.classList.add("shadow");
            }else{
                this.previousElementSibling.classList.remove("shadow");
            }

        });
    })
});

// ------------------------------- 팝업 함수 ------------------------------- //
//팝업 열기
function openPopup($popName){
    document.querySelector("#"+$popName).classList.add("on");
}
//팝업 닫기
function closePopup($popName){
    document.querySelector("#"+$popName).classList.remove("on");
}

//알럿
function openAlert($altName){
    document.querySelector("#"+$altName).classList.add("on");
}
function closeAlert($altName){
    document.querySelector("#"+$altName).classList.remove("on");
}

// ------------------------------- 탭메뉴 함수 ------------------------------- //
//모드 탭 함수
function tabMenuInit(){
    //모드탭의 수
    const modTabs = document.querySelectorAll(".modTab");
    modTabs.forEach(function(modTab,tabIdx,elements){
        const tabmenus = modTab.querySelectorAll(".tabName");
        const tabConts = modTab.querySelectorAll(".tabCont");

        //모드탭 내의 메뉴 수
        tabmenus.forEach(function(tabmenu,menuIdx,inElements){
            tabmenu.addEventListener("click", function(event){
                inElements.forEach(function(inElement){
                    inElement.classList.remove("on");
                    inElement.setAttribute("title", "탭메뉴");
                });
                this.classList.add("on");
                this.setAttribute("title", "선택 된 탭메뉴");
                tabConts.forEach(function(tabCont,contIdx){
                    tabCont.classList.remove("on");
                    if(menuIdx == contIdx){
                        tabCont.classList.add("on");
                    }
                })
            });
        });
    });
}


// ------------------------------- 아코디언 함수 ------------------------------- //
//모드 아코디언 함수
function accordionInit(){
    const modAccos = document.querySelectorAll(".modAccordion");
    modAccos.forEach(function(modAcco,modIdx){
        const accoItems = modAcco.querySelectorAll(".accoArea");
        accoItems.forEach(function(accoItem,itemIdx,elements){
            const accoBtn = accoItem.querySelector(".accoTitle");
            const accoCont = accoItem.querySelector(".accoBody");
            accoBtn.addEventListener("click",function(){
                if(this.classList.contains("on")){
                    this.classList.remove("on");
                    slideUp(accoCont,300);
                    return;
                }
                this.classList.add("on");
                slideDown(accoCont,300);
            });
        });
    });
}


// ------------------------------- 아코디언 리스트 함수 ------------------------------- //
//모드 아코디언 리스트 함수
function accordionListInit(){
    const modAccos = document.querySelectorAll(".modAccordionList");
    modAccos.forEach(function(modAcco,modIdx){
        const accoItems = modAcco.querySelectorAll(".accoArea");
        accoItems.forEach(function(accoItem,itemIdx,elements){
            const accoBtn = accoItem.querySelector(".accoTitle");
            const accoCont = accoItem.querySelector(".accoBody");

            accoBtn.addEventListener("click",function(){
                elements.forEach(function(element, eleIdx){
                    if(element.classList.contains("on")){
                        element.classList.remove("on");
                        slideUp(element.querySelector(".accoBody"),300);
                    }else if(itemIdx == eleIdx){
                        element.classList.add("on");
                        slideDown(element.querySelector(".accoBody"),300);
                    }
                });
            });
        });
    });
}
// ------------------------------- 모션 함수 ------------------------------- //

//fade in
function fadeIn(element, duration){
    let opacity = 0;
    element.style.display = "block";
    element.style.opacity = opacity;
    let action = setInterval(function(){
        opacity += 10/duration;
        element.style.opacity = opacity;
        if(opacity >= 1){
            clearInterval(action);
        }
    }, 10);
}

//fade out
function fadeOut(element, duration){
    let opacity = 1;
    element.style.opacity = opacity;
    let action = setInterval(function(){
        opacity -= 10/duration;
        element.style.opacity = opacity;
        if(opacity <= 0){
            clearInterval(action);
            element.style.display = "none";
        }
    }, 10);
}

//fade toggle
function fadeToggle(element, duration){
    element.style.display == "block" ? fadeOut(element, duration) : fadeIn(element, duration);
}

//slide function (slideUp)
function slideUp(element, duration) {
    let height = element.scrollHeight;
    let interval = 10; // millidurationonds per frame
    let steps = Math.ceil(duration / interval);
    let stepHeight = height / steps;
    let currentStep = 0;

    let slideUpInterval = setInterval(function() {
        currentStep++;
        element.style.height = (height - stepHeight * currentStep) + "px";
        if (currentStep >= steps) {
            clearInterval(slideUpInterval);
            element.style.display = "none";
            element.style.height = ""; // 높이를 초기화하여 다시 제대로 작동하도록 합니다.
        }
    }, interval);
}

//slide function (slideDown)
function slideDown(element, duration) {
    element.style.display = "block";
    element.style.height = "0px"; // 이 부분을 수정하여 초기 높이를 0으로 설정합니다.
    let height = element.scrollHeight;
    let interval = 10; // millidurationonds per frame
    let steps = Math.ceil(duration / interval);
    let stepHeight = height / steps;
    let currentStep = 0;

    let slideDownInterval = setInterval(function() {
        currentStep++;
        element.style.height = (stepHeight * currentStep) + "px";
        if (currentStep >= steps) {
            clearInterval(slideDownInterval);
            element.style.height = ""; // 높이를 초기화하여 다시 제대로 작동하도록 합니다.
        }
    }, interval);
}

// ------------------------------- 기타 함수 ------------------------------- //
//parents 엘리먼트 찾기
function parentsElementFind(my, findElement){
    let parentElement = my.parentNode;
    for(let i = 0;i<=20;++i){
        if(!parentElement.classList.contains(findElement)){
            parentElement = my.parentNode.parentNode;
        }else{
            return parentElement;
        }
    }
}

// ------------------------------- datePicker ------------------------------- //
//날짜
function datePicker(startIpt, startCont){
    let datepicker = new tui.DatePicker('#'+startCont, {
        date: new Date(),
        input: {
            element: '#'+ startIpt,
            format: 'yyyy-MM-dd'
        }
    });
}
//날짜 + 시간
function timePicker(startIpt, startCont){
    let datepicker = new tui.DatePicker('#'+startCont, {
        date: new Date(),
        input: {
            element: '#'+ startIpt,
            format: 'yyyy-MM-dd HH:mm A'
        },
        timePicker: true
    });
}
//datePicker("datepicker-input","wrapper");

//날짜 기간~기간
function datePickerTo(startIpt, startCont, endIpt, endCont){
    let today = new Date();
    let picker = tui.DatePicker.createRangePicker({
        startpicker: {
            date: today,
            input: '#'+ startIpt,
            container: '#'+ startCont
        },
        endpicker: {
            date: today,
            input: '#'+ endIpt,
            container: '#'+ endCont
        },
        selectableRanges: [
            [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
        ],
        format: 'YYYY-MM-dd'
    });

    picker.on('change:end', () => {
        console.log(123);
    })
}
//날짜 기간+시간 ~ 기간+시간
function timePickerTo(startIpt, startCont, endIpt, endCont){
    let today = new Date();
    let picker = tui.DatePicker.createRangePicker({
        startpicker: {
            date: today,
            input: '#'+ startIpt,
            container: '#'+ startCont
        },
        endpicker: {
            date: today,
            input: '#'+ endIpt,
            container: '#'+ endCont
        },
        selectableRanges: [
            [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
        ],
        format: 'YYYY-MM-dd HH:mm',
        timePicker: true
    });

    picker.on('change:end', () => {
        console.log(123);
    })
}

//datePickerTo("startpicker-input", "startpicker-container", "endpicker-input", "endpicker-container");
