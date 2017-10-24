var height = 480;
var width = 480;
var colours = {
    1: ['#d98880','#cf7e76','#c5766d','#bb6d63','#b1635a','#a85a51','#9e5248','#94483f','#8b4037','#81372e','#772f26','#6e271e','#641e16'],
    2: ['#d2b4de','#c6a7d2','#ba9ac7','#af8ebb','#a381b0','#9774a5','#8c689a','#815d8f','#755084','#6b4579','#60396f','#552f65','#4a235a'],
    3: ['#85c1e9','#7cb7de','#73add4','#6aa2ca','#6299c0','#5990b6','#5085ab','#487da2','#3f7398','#36698e','#2e6185','#24577b','#1b4f72'],
    4: ['#73c6b6','#6abbac','#62b2a2','#59a798','#519d8e','#499485','#418a7b','#388171','#307769','#286e60','#1f6456','#155c4d','#0b5345'],
    5: ['#82e0aa','#79d6a0','#71cc96','#68c28d','#5fb783','#56ad7a','#4ea371','#469a67','#3d905e','#358755','#2b7d4c','#227344','#186a3b'],
    6: ['#f8c471','#edba68','#e3b05f','#d8a657','#ce9c4e','#c49246','#ba893e','#af7f35','#a6752d','#9b6c24','#92631c','#875a13','#7e5109'],
    7: ['#85929e','#7c8894','#727f8a','#687581','#5f6b77','#56636e','#4d5965','#44505c','#3c4753','#333e4a','#2b3642','#232e39','#1b2631']
}
var colour_number = 1;
var colour_index = 0;
var rows = 0, cols = 0;
var timer = null;

function create_grid(length){
    $('#container').html('');
    for (var i = 0; i < length; i++){
        var $row = $('<div></div>');
        $row.css({
            'height': '' + (height / length) + 'px',
            'width': '' + (width) + 'px'
        });
        for (var j = 0; j < length; j++){
            var $cell = $('<div></div>');
            $cell.css({
                'height': '100%',
                'width': '' + (width / length) + 'px',
                'display': 'inline-block',
                'background-colour': 'rgb(255, 255, 255)'
            });
            $cell.attr({
                'step': '1',
                'coord': '' + i + '-' + j
            });
            $cell.addClass('cell');
            $row.append($cell);
        }
        rows += 1;
        $('#container').append($row);
    }
    cols = rows;
    console.log(cols);
}

function w2b(){
    var step = parseInt($(this).attr('step'));
    var red = 255 - (Math.floor(255 * 10 / 100) * step);
    var green = 255 - (Math.floor(255 * 10 / 100) * step);
    var blue = 255 - (Math.floor(255 * 10 / 100) * step);
    var colour_string = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    console.log(colour_string);
    $(this).css('background', colour_string);
    $(this).attr('step', (step + 1));
}

function random_colour(){
    var red = 255 - (Math.floor(Math.random() * 255));
    var green = 255 - (Math.floor(Math.random() * 255));
    var blue = 255 - (Math.floor(Math.random() * 255));
    var colour_string = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    $(this).css('background', colour_string);
}

function trail(){
    var colour_value = get_colour();
    $(this).css('background', colour_value);
}

function get_colour(){
    var colour_list = colours[colour_number];
    var colour = colour_list[colour_index];
    if (colour_index === (colour_list.length - 1)){
        colour_index = 0;
        colour_number = (colour_number === 7 ? 1 : colour_number + 1);
    } else {
        colour_index += 1;
    }
    return colour;
}

function snake(){
    var i = 0, j = 0;
    var increment = 1;
    colour_index = 0;
    colour_number = 1;
    var coord = '' + i + '-' + j
    colour = get_colour();
    var $cell = $('div[coord="' + coord + '"');
    console.log('coords: ' + coord);
    $cell.css('background', colour);
    j = 0;
    timer = setInterval(function(){
        var coord = '' + i + '-' + j
        colour = get_colour();
        var $cell = $('div[coord="' + coord + '"');
        $cell.css('background', colour);
        j += increment;
        if (j === -1 || j === cols){
            j = (j === -1 ? 0 : (cols - 1));
            i = (i === (rows - 1) ? 0 : (i + 1));
            increment = -increment;
        }
    }, 300);
}

$(function(){
    var colour_change_function = {
        'w2b': w2b,
        'random_colour': random_colour,
        'trail': trail,
        'snake': snake
    }
    $('#length').val('4');

    $('#clear').click(function(){
        clearInterval(timer);
    });

    $('#start').click(function(){
        clearInterval(timer);
        var cell_hover = colour_change_function[$('select').val()];
        var length = parseInt($('#length').val());
        create_grid(length);
        $('.cell').css('background-colour', 'rgb(255, 255, 255)');
        if (cell_hover === snake){
            snake();
            $('#clear').show();
        } else {
            $('.cell').hover(cell_hover, function(){});
        }
    });
}); 