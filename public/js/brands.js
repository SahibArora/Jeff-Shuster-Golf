window.onload = (event) => {
    document.getElementById('shafts_txt').style.borderBottom = '2px solid black';
    document.getElementById('clubs_table').style.display = 'none';
}

function showShafts() {
    document.getElementById('clubs_txt').style.borderBottom = 'none';
    document.getElementById('clubs_table').style.display = 'none';
    document.getElementById('shafts_txt').style.borderBottom = '2px solid black';
    document.getElementById('shafts_table').style.display = '';
}

function showClubs() {
    document.getElementById('shafts_txt').style.borderBottom = 'none';
    document.getElementById('shafts_table').style.display = 'none';
    document.getElementById('clubs_txt').style.borderBottom = '2px solid black';
    document.getElementById('clubs_table').style.display = '';
}