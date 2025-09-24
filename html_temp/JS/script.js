$(function () {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let drawing = false;
  let startX, startY;
  let currentColor = 'black';
  let currentShape = 'rect';
  let diff_trangle = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    phase: false
  }

  // Вибір кольору
 currentColor = $('#colorPicker').val();

$('#colorPicker').on('input', function () {
  currentColor = $(this).val();
});

  // Вибір фігури
  $('input[name="shape"]').on('change', function () {
    currentShape = $(this).val();
  });

  // Початок малювання
  $('#canvas').on('mousedown', function (e) {
    if(currentShape === 'diff_triangle') {
        drawing = true ;
        if(!diff_trangle.phase) {
            const rect = canvas.getBoundingClientRect();
            diff_trangle.x1 = e.clientX - rect.left;
            diff_trangle.y1 = e.clientY - rect.top;
            
            return;
        }
        else {
            const rect = canvas.getBoundingClientRect();
            diff_trangle.x3 = e.clientX - rect.left;
            diff_trangle.y3 = e.clientY - rect.top;
            return;
        }
        
    }
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  // Завершення малювання
  $('#canvas').on('mouseup', function (e) {
    if (!drawing) return;
    if(currentShape === 'diff_triangle') {
        if(!diff_trangle.phase) {
            const rect = canvas.getBoundingClientRect();
            diff_trangle.x2 = e.clientX - rect.left;
            diff_trangle.y2 = e.clientY - rect.top;
            diff_trangle.phase = true;
            drawing = false;
            return;
        }
    else {
        //draw triangle
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.moveTo(diff_trangle.x1, diff_trangle.y1);
        ctx.lineTo(diff_trangle.x2, diff_trangle.y2);
        ctx.lineTo(diff_trangle.x3, diff_trangle.y3);
        ctx.closePath();
        ctx.fill();
        diff_trangle.phase = false;
        drawing = false;
        return;
    }
        }
    drawing = false;
    const rect = canvas.getBoundingClientRect();
    let endX = e.clientX - rect.left;
    let endY = e.clientY - rect.top;
    let width = endX - startX;
    let height = endY - startY;

    ctx.fillStyle = currentColor;

    switch (currentShape) {
      case 'rect':
        ctx.fillRect(startX, startY, width, height);
        break;
      case 'circle':
        let radius = Math.sqrt(width * width + height * height);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(startX, endY);
        ctx.closePath();
        ctx.fill();
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo((startX + endX) / 2, startY);
        ctx.lineTo(endX, (startY + endY) / 2);
        ctx.lineTo((startX + endX) / 2, endY);
        ctx.lineTo(startX, (startY + endY) / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }
  });
});