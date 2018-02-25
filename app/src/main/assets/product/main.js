var products_data = [];         // TOTAL PRODUCTS 
var display_products = [];      // DISPLAYED PRODUCTS 
var sorting;                    // FOR SORTING

/**
 * Sorting
 *  
 * if in search then sort search items 
 * else sort whole items
 * 
 * if price is high to low then reverse array
 */
function sort(t)
{
    var data = [];
    
    if($("#search_query").val().length > 0){
        data = display_products.sort(function(a, b) {
            return parseInt(a.price) - parseInt(b.price);
        });
    }else{
        data = products_data.sort(function(a, b) {
            return parseInt(a.price) - parseInt(b.price);
        });
    }

    if(t == 'htl') data.reverse(); 
    
    update_html(data);
}

/**
 * Search input box
 * 
 * search when user hits enter
 */

$("#search_query").on('keypress', function (e){
    if(e.keyCode == 13) search();
});

/**
 * Search button onclick action
 * 
 * filter the products with queried term 
 */

function search()
{
    var search_query = $("#search_query").val().toLowerCase();

    display_products = [];
    
    $.each(products_data, function (i, v){
        if(v['title'].toLowerCase().indexOf(search_query) != -1 || v['description'].toLowerCase().indexOf(search_query) != -1)
            display_products.push(v);
    });
    
    update_html(display_products);
}

/**
 * UPDATE Products for first time
 */

function update_html(data)
{
    $("#product_content").html(""); // clear 
    if(data.length == 0) 
        $("#product_content").html("No Products to disply.");
    else
        $.each(data, function (i, v){
            $("#product_content").append(product_html(v));
        });
}

/**
 * GET data from api for JSON 
 */
function get_data()
{
    $.getJSON( "data.json", function( data ) {
        products_data = data;
        update_html(data);
    });
}

/**
 * Body Onload - Load Products and Display
 */
function init()
{
    get_data();
}

/**
 * Product HTML Template
 */
function product_html(data)
{
    var html = '<div class="col-md-3 col-sm-6 animated fadeInUp"><span class="thumbnail" style="box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);"><img src="'+data['image']+'" alt="'+data['title']+'"><h4 style="font-size:15px;">'+data['title']+' <p style="font-size:8px;float:right;text-decoration: underline;font-weight:400;">'+data['bpom']+'</p></h4><p>'+data['description']+'</p><hr class="line" style="width:100%;"><div class="row"><div class="col-md-6 col-sm-6"></div><div class="col-md-6 col-sm-6"><button class="btn btn-success right" style="text-align:center;margin-bottom:-6px;margin-top:6px;"> <a href="'+data['url']+'" style="font-weight:800;color:#ffffff;">Price: Rp. '+data['price']+'  BUY NOW</a></button></div></div><hr class="line" style="width:95%;"><div class="row"><div class="col-md-6 col-sm-6"><p class="price" style="font-size:15px;margin-left:15%;margin-top:5px;margin-bottom:-9px;">Rp. '+data['retail']+' <span style="font-size:10px!important;float:right;margin-right:15%;margin-top:4px;">Harga Retail</span></p><hr class="line" style="width:95%;"><div class="row"><div class="col-md-6 col-sm-6"><p class="price" style="font-size:15px;margin-left:15%;margin-top:5px;margin-bottom:5px;">'+data['point']+' <span style="font-size:10px!important;float:right;margin-right:15%;margin-top:4px;margin-bottom:12px;">Point Reward</span></p></div></div><hr class="line" style="width:100%;margin-top:-0px;"></span></div>';
    return html;
}
