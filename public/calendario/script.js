document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const daysContainer = document.querySelector('.days-container');
    const yearSelect = document.getElementById('yearSelect');
    const monthName = document.getElementById('monthName');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const eventDate = document.getElementById('eventDate');
    const eventDescription = document.getElementById('eventDescription');
    const saveEvent = document.getElementById('saveEvent');
    const deleteEvent = document.getElementById('deleteEvent');
    const eventDetails = document.getElementById('eventDetails');
    let selectedDay = null;
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    const events = {};

    function createYearOptions() {
        const startYear = new Date().getFullYear();
        for (let year = startYear; year <= startYear + 50; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        yearSelect.value = startYear;
    }

    function updateMonthName() {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        monthName.textContent = `${months[currentMonth]} ${currentYear}`;
    }

    function createCalendar(year, month) {
        daysContainer.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const days = [];

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, daysInPrevMonth - i),
                currentMonth: false
            });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                date: new Date(year, month, day),
                currentMonth: true
            });
        }

        const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
        if (lastDayOfMonth !== 6) { // Se não é sábado
            const daysToAdd = 6 - lastDayOfMonth;
            for (let i = 1; i <= daysToAdd; i++) {
                days.push({
                    date: new Date(year, month + 1, i),
                    currentMonth: false
                });
            }
        }

        days.forEach(dayInfo => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            if (!dayInfo.currentMonth) {
                dayDiv.classList.add('text-muted');
            }
            dayDiv.textContent = dayInfo.date.getDate();
            dayDiv.dataset.date = dayInfo.date.toISOString().split('T')[0];
            dayDiv.addEventListener('click', () => selectDay(dayDiv));
            daysContainer.appendChild(dayDiv);
            if (events[dayDiv.dataset.date]) {
                dayDiv.classList.add('event');
            }
        });
    }

    function selectDay(dayDiv) {
        if (selectedDay) {
            selectedDay.classList.remove('selected');
        }
        selectedDay = dayDiv;
        selectedDay.classList.add('selected');
        eventDate.textContent = `Data: ${dayDiv.dataset.date.split('-').reverse().join('/')}`;
        eventDescription.value = events[selectedDay.dataset.date] || '';
        eventDetails.classList.add('active');
    }

    saveEvent.addEventListener('click', () => {
        if (selectedDay) {
            events[selectedDay.dataset.date] = eventDescription.value;
            selectedDay.classList.add('event');
            alert("Evento salvo com sucesso!")
        }
    });

    deleteEvent.addEventListener('click', () => {
        if (selectedDay) {
            delete events[selectedDay.dataset.date];
            selectedDay.classList.remove('event');
            eventDescription.value = '';
            alert("Evento excluído com sucesso!")
        }
    });

    yearSelect.addEventListener('change', () => {
        currentYear = parseInt(yearSelect.value);
        createCalendar(currentYear, currentMonth);
        updateMonthName();
    });

    prevMonth.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
            yearSelect.value = currentYear;
        } else {
            currentMonth--;
        }
        createCalendar(currentYear, currentMonth);
        updateMonthName();
    });

    nextMonth.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
            yearSelect.value = currentYear;
        } else {
            currentMonth++;
        }
        createCalendar(currentYear, currentMonth);
        updateMonthName();
    });

    createYearOptions();
    updateMonthName();
    createCalendar(currentYear, currentMonth);
});

document.getElementById('voltar').addEventListener('click', function () {
    window.history.back();
});