// Function to convert AD to BS
function convertADtoBS() {
    const adDate = new Date(document.getElementById('ad-date').value);
    const adYear = adDate.getFullYear();
    const adMonth = adDate.getMonth() + 1; // Months are zero-based
    const adDay = adDate.getDate();

    // Simplified conversion logic for AD to BS
    let bsYear = adYear + 56; // Adjust for BS year
    let bsMonth = adMonth + 8; // Adjust for BS month
    if (bsMonth > 12) {
        bsMonth -= 12;
        bsYear++;
    }
    
    let bsDay = adDay + 17;
    if (bsDay > 30) {
        bsMonth += 1;
        bsDay -= 30; // Roughly assuming a 30-day month
    }
    
    // Handle day overflow for months
    const daysInBSMonth = getDaysInBSMonth(bsYear, bsMonth);
    if (bsDay > daysInBSMonth) {
        bsDay = daysInBSMonth;
    }
    


    // Display the converted BS date
    document.getElementById('bs-result').innerText = `Year : ${bsYear}, Month : ${('0' + bsMonth).slice(-2)}, Day : ${('0' + bsDay).slice(-2)}`;
}

// Function to convert BS to AD
function convertBStoAD() {
    const bsInput = document.getElementById('bs-date').value.split('-');
    const bsYear = parseInt(bsInput[0]);
    const bsMonth = parseInt(bsInput[1]);
    const bsDay = parseInt(bsInput[2]);

    // Check if BS date is valid
    if (isNaN(bsYear) || isNaN(bsMonth) || isNaN(bsDay)) {
        document.getElementById('ad-result').innerText = 'Invalid BS Date';
        return;
    }

    // Adjustments for BS to AD conversion
    let adYear = bsYear - 56; // Adjust for AD year
    let adMonth = bsMonth - 8; // Adjust for AD month
    if (adMonth <= 0) {
        adMonth += 12;
        adYear--;
    }
    
    let adDay = bsDay - 17;
    if (adDay <= 0) {
        adMonth -= 1;
        adDay += 30; // Roughly assuming a 30-day month
    }
    
    // Handle day overflow for months
    const daysInADMonth = getDaysInADMonth(adYear, adMonth);
    if (adDay > daysInADMonth) {
        adDay = daysInADMonth;
    }

    // Format the AD date for display
    const formattedADYear = adYear.toString().padStart(4, '0');
    const formattedADMonth = adMonth.toString().padStart(2, '0');
    const formattedADDay = adDay.toString().padStart(2, '0');

    // Display the converted AD date
    document.getElementById('ad-result').innerText = `Year : ${formattedADYear}, Month : ${formattedADMonth}, Day : ${formattedADDay}`;
}

// Function to get the number of days in a BS month
function getDaysInBSMonth(year, month) {
    // Adjust the month to match the actual BS calendar
    switch(month) {
        case 1: return 31; // Baishakh
        case 2: return 32; // Jestha
        case 3: return 31; // Ashadh
        case 4: return 32; // Shrawan
        case 5: return 31; // Bhadra
        case 6: return 30; // Ashwin
        case 7: return 30; // Kartik
        case 8: return 30; // Mangsir
        case 9: return 29; // Poush
        case 10: return 30; // Magh
        case 11: return 29; // Falgun
        case 12: return 31; // Chaitra
        default: return 30; // Default value
    }
}

// Function to get the number of days in an AD month
function getDaysInADMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Function to toggle date input based on selected DOB type
function toggleDOBInput() {
    const dobType = document.getElementById('dob-type').value;
    if (dobType === 'AD') {
        document.getElementById('ad-dob-input').style.display = 'block';
        document.getElementById('bs-dob-input').style.display = 'none';
    } else {
        document.getElementById('ad-dob-input').style.display = 'none';
        document.getElementById('bs-dob-input').style.display = 'block';
    }
}

// Function to calculate age
function calculateAge() {
    const dobType = document.getElementById('dob-type').value;
    let dob;

    if (dobType === 'AD') {
        dob = new Date(document.getElementById('dob-ad').value);
    } else {
        // Convert BS to AD before calculating age
        const bsInput = document.getElementById('dob-bs').value.split('-');
        const bsYear = parseInt(bsInput[0]);
        const bsMonth = parseInt(bsInput[1]);
        const bsDay = parseInt(bsInput[2]);
        const adYear = bsYear - 56;
        const adMonth = bsMonth - 8 <= 0 ? bsMonth + 4 : bsMonth - 8;
       
        // Handle year transition if month underflows
        const adjustedAdYear = bsMonth - 8 <= 0 ? adYear - 1 : adYear;

        const adDay = bsDay -17 <=0 ? bsDay + 13 : bsDay - 17;
        const adjustedAdMonth = bsDay - 17 <= 0 ? adMonth - 1 : adMonth;

        dob = new Date(`${adjustedAdYear}-${adjustedAdMonth}-${('0' + adDay).slice(-2)}`);
    }

    const today = new Date();
    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();

    // Adjust months and years if needed
    if (ageDays < 0) {
        ageMonths--;
        ageDays += getDaysInADMonth(today.getFullYear(), today.getMonth());
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Display calculated age
    document.getElementById('age-result').innerText = ` ${ageYears} years, ${ageMonths} months, and ${ageDays} days.`;
}



