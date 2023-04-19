$(document).ready(() => {
    status = "add"
    getCategories()
    getCerts()
    let pathName = window.location.pathname
    if(pathName.length > 1){
        let id = pathName.substring(1)
        getCertById(id)
    }
})

let status;
let cerId = 0;
let currentPage = 0;
let totalPage = 0;
let numberOfElements = 0;

/* API */
function getCategories() {
    $.ajax({
        url: "/api/v1/categories",
        type: "GET",
        dataType: "json",
        success: function (res) {
            renderCategoriesOption(res)
        },
        error: function (e) {
            console.log(e.responseJSON.message)
        }
    })
}

function createCert(){
    $.ajax({
        url: "/api/v1/cert/add",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(
            {
                "id": $('#cert-id').val(),
                "certName": $('#cert-name').val(),
                "cost": $('#cost').val(),
                "cateId": $('#category option:selected').val()
            }
        ),
        success: function (res) {
            getCerts()
            resetForm()
            console.log(res)
        },
        error: function (e) {
            let res = e.responseJSON;
            if(res.message === undefined){
                for (index in res){
                    toastr.error(res[index])
                }
            } else{
                toastr.error(res.message)
            }
        }
    })
}

function getCerts(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    $.ajax({
        url: `/api/v1/cert?${urlParams}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            setGlobalVariable(res)
            renderCert(res.content)
            renderPagination(totalPage)
            setDisabledPrevNext()
            setActivePage()
        },
        error: function (e) {
            console.log(e.responseJSON.message)
        }
    })
}

function deleteCert(id){
    $.ajax({
        url: `/api/v1/cert/${id}`,
        type: "DELETE",
        dataType: "json",
        success: function (res) {
            numberOfElements -= 1
            if(numberOfElements < 1 && currentPage > 1){
                changePage(currentPage - 1)
            } else {
                getCerts()
            }
            $(`.modal-backdrop`).hide()
        },
        error: function (e) {
            console.log(e.responseJSON.message)
        }
    })
}

function updateCert(id){
    $.ajax({
        url: `/api/v1/cert/${id}`,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(
            {
                "id": `${id}`,
                "certName": $('#cert-name').val(),
                "cost": $('#cost').val(),
                "cateId": $('#category option:selected').val()
            }
        ),
        success: function (res) {
            getCerts()
            console.log(res)
        },
        error: function (e) {
            let res = e.responseJSON;
            if(res.message === undefined){
                for (index in res){
                    toastr.error(res[index])
                }
            } else{
                toastr.error(res.message)
            }
        }
    })
}

function getCertById(id){
    $.ajax({
        url: `/api/v1/cert/${id}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            renderUpdateForm(res)
        },
        error: function (e) {
            console.log(e.responseJSON.message)
        }
    })
}

/* Logic Function */
// Set Global Variable

function setGlobalVariable(obj){
    currentPage = obj.number + 1
    totalPage = obj.totalPages
    numberOfElements = obj.numberOfElements
}

// Render list categories for select
function renderCategoriesOption(res) {
    let html = "";
    res.forEach((el) => {
        html += `<option value="${el.id}">${el.name}</option>`
    })
    $('#category').html(html)
}

function renderCert(res){
    let html = ""
    res.forEach((el) => {
        html += `
                <tr>
                    <td><a href="javascript:void(0)" 
                            onclick="getCertById('${el.id}')">${el.id}</a></td>
                    <td>${el.name}</td>
                    <td>${el.cost}</td>
                    <td>${el.category.name}</td>
                    <td>
                        <!-- Button trigger modal -->
                        <a href="#" class="card-link" data-toggle="modal"
                           data-target="#delete-modal-${el.id}">
                            Delete
                        </a>
                    
                        <!--Modal -->
                        <div class="modal fade" id="delete-modal-${el.id}" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Do you want to delete this record?</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Do you want to delete the Cert (${el.id})?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" onclick="deleteCert('${el.id}')">OK</button>
                                        <button type="button" class="btn btn-outline-secondary"
                                                data-dismiss="modal">Cancel
                                        </button>
                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    $('#list-cert').html(html)
}

function renderPagination(el){
    let html = `<li class="page-item" id="prev-page">
                <a class="page-link" href="javascript:void(0)" 
                aria-label="Next" 
                onclick="changePage(${currentPage - 1})">
                   <span aria-hidden="true"><i class="bi bi-chevron-left"></i></span>
                   <span class="sr-only">Prev</span>
                </a>
             </li>`
    let page = 1
    while (page <= el){
        html += `<li class="page-item" id="page-${page}">
                    <a class="page-link" 
                    href="javascript:void(0)" 
                    onclick="changePage(${page})">
                    ${page}</a>
                 </li>`
        page++
    }
    html += `<li class="page-item" id="next-page">
                <a class="page-link" href="javascript:void(0)" 
                aria-label="Next" 
                onclick="changePage(${currentPage + 1})">
                   <span aria-hidden="true"><i class="bi bi-chevron-right"></i></span>
                   <span class="sr-only">Next</span>
                </a>
             </li>`
    $(".pagination").html(html)
}

function changePage(page){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set("page", page);
    window.history.replaceState(page, "page", `?${urlParams}`)
    getCerts()
}

function setDisabledPrevNext(){
    $(".pagination .disabled").removeClass("disabled")

    if(currentPage === 1){
        $("#prev-page").addClass("disabled")
    }
    if(currentPage === totalPage || totalPage === 0){
        $("#next-page").addClass("disabled")
    }
}

function setActivePage(){
    $(".pagination .active").removeClass("active")
    $(`#page-${currentPage}`).addClass("active")
}

function resetForm(){
    $('#cert-id').not(':disabled').val("")
    $('#cert-name').val("")
    $('#cost').val("")
    $('#category option').first().attr('selected', true)
}

function renderUpdateForm(obj){
    $(`#category option:selected`).removeAttr('selected')

    $('#cert-id').attr('disabled', true).val(`${obj.id}`)
    $('#cert-name').val(`${obj.name}`)
    $('#cost').val(`${obj.cost}`)
    $(`#category option[value=${obj.cateId}]`).attr('selected', true)
    status = "update";
    cerId = obj.id;

    renderUpdateCertURL(obj.id)
}

function renderUpdateCertURL(id){
    const path = window.location.pathname
    window.history.replaceState(null, "", `/${id}`)
}

// Button event
$('#btn-save').click((e) => {
    e.preventDefault();
    if($("#save-form").valid()) {
        if (status === "add") {
            createCert()
        }
        if (status === "update") {
            updateCert(cerId)
        }
    }
})

$('#btn-reset').click((e) => {
    e.preventDefault();
    resetForm()
})





