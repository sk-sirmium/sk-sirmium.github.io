// Sačekaj da se DOM učita pre svega
document.addEventListener('DOMContentLoaded', function() {
    
    // Prvo proveri da li uopšte postoji slider na stranici
    if (!document.querySelector('.slider-track')) {
        console.log("Nema klizača na ovoj stranici - preskačem");
        return; // OVO JE DOZVOLJENO - unutar funkcije!
    }

    // Tek onda traži elemente
    const sliderTrack = document.querySelector('.slider-track');
    const sliderThumb = document.querySelector('.slider-thumb');
    const sliderVerified = document.getElementById('slider-verified');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!sliderTrack || !sliderThumb || !sliderVerified || !submitBtn) {
        console.error('Elementi klizača nisu pronađeni');
        return;
    }
    
    let isDragging = false;
    let startX = 0;
    let thumbLeft = 0;
    let trackWidth = sliderTrack.offsetWidth;
    const thumbWidth = sliderThumb.offsetWidth;
    let maxLeft = trackWidth - thumbWidth;
    
    // Mouse events
    sliderThumb.addEventListener('mousedown', startDrag);
    sliderThumb.addEventListener('touchstart', startDrag, { passive: false });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    
    function startDrag(e) {
        if (sliderVerified.value === 'true') return; // Već verifikovano
        
        e.preventDefault();
        isDragging = true;
        sliderThumb.classList.add('dragging');
        
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startX = clientX - thumbLeft;
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        let newLeft = clientX - startX;
        
        // Ograničenja
        if (newLeft < 0) newLeft = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;
        
        thumbLeft = newLeft;
        sliderThumb.style.left = thumbLeft + 'px';
        
        // Ako je prevučen do kraja - verifikacija
        if (thumbLeft >= maxLeft - 5) { // 5px tolerancije
            verifySlider();
        }
    }
    
    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            sliderThumb.classList.remove('dragging');
            
            // Ako nije verifikovan, vrati na početak
            if (sliderVerified.value !== 'true') {
                resetSlider();
            }
        }
    }
    
    function verifySlider() {
        sliderVerified.value = 'true';
        sliderThumb.classList.add('verified');
        sliderThumb.style.left = maxLeft + 'px';
        sliderThumb.innerHTML = '✓';
        submitBtn.disabled = false;
        isDragging = false;
    }
    
    function resetSlider() {
        if (sliderVerified.value === 'true') return;
        thumbLeft = 0;
        sliderThumb.style.left = '0px';
    }
    
    // Reset na klik na track (opciono)
    sliderTrack.addEventListener('click', function(e) {
        if (sliderVerified.value === 'true') return;
        resetSlider();
    });
    
    // Ažuriraj maxLeft ako se prozor resize-uje
    window.addEventListener('resize', function() {
        trackWidth = sliderTrack.offsetWidth;
        maxLeft = trackWidth - thumbWidth;
        
        if (sliderVerified.value === 'true') {
            sliderThumb.style.left = maxLeft + 'px';
        } else {
            resetSlider();
        }
    });
});