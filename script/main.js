/**
 * Created by jarek on 15/01/16.
 */
window.onload = function () {
    var el = {
        form: document.getElementById('form'),
        jawny: document.getElementById('jawny'),
        klucz: document.getElementById('klucz'),
        output: document.getElementById('output'),
        //rozszyfruj: document.getElementById('rozszyfruj')
    };

    var transpose = function(a) {

        var w = a.length ? a.length : 0,
            h = a[0] instanceof Array ? a[0].length : 0;

        if(h === 0 || w === 0) {
            return [];
        }

        var i, j, t = [];

        for(i=0; i<h; i++) {
            t[i] = [];

            for(j=0; j<w; j++) {
                t[i][j] = a[j][i];
            }
        }

        return t;
    };

    var toBin = function (input, bits) {

        bits = bits / 8;

        var output = [];
        for (var i = 0; i < input.length; i++) {

            var compact = input.charCodeAt(i);

            compact = compact.toString(2);

            if (compact.length < 8) {
                var inputZeros = 8 - compact.length,
                    zeros = '';

                for (var j = 0; j < inputZeros; j++) {
                    zeros += '0';
                }

                compact = zeros + compact;
            }

            compact = compact.split('');

            output.push(compact);
        }

        console.log(output.length);

        if(output.length < bits) {
            var zeros = bits - output.length;

            for (var i = 0; i < zeros; i++) {
                output.push(['0','0','0','0','0','0','0','0']);
            }
        }

        return output;
    };

    var binToStr = function (input) {


        var output = '',
            moveIndex = parseInt(32);


        for (var i in input) {
            output += String.fromCharCode(parseInt(input[i], 2) + moveIndex);
        }

        return output;
    };

    var xor = function (inputA, inputB) {
        if (inputA.length !== inputB.length) {
            alert('Klucz i tekst jawny/szyfr muszą być tej samej dłgości!');
            return false;
        }

        var output = new Array();
        inputA = toBin(inputA, 64);
        inputB = toBin(inputB, 56);

        var transposedA = transpose(inputA);

        var block32A = [],
            block32B = [];

        for (var i in transposedA) {
            if(i < 4) {
                block32A.push(transposedA[i]);
            } else {
                block32B.push(transposedA[i]);
            }
        }

        console.log(block32A, block32B);

        for (var i in inputA) {
            output[i] = '';

            for (var j = 0; j < 7; j++) {
                if (inputA[i][j] === inputB[i][j]) {
                    output[i] += 0;
                } else {
                    output[i] += 1;
                }
            }
        }

        output = binToStr(output);

        return output;
    };

    var addMessage = function (msg) {

        el.output.value = msg;

    };


    el.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var result = xor(el.jawny.value, el.klucz.value, false);
        if (result) {
            addMessage(result);
        }
    });

};
