import {
    getCorrectDateOrder,
    getToday,
    formatDateToCA,
} from "./date-utilities.js";


// Add to main Style Sheet
const styles = `
    .dialogs-disable-select {
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;
    }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


const modalBackgroundStyles = `
    position: fixed;
    inset: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-background-transparent);
    z-index: 100;
    overflow: scroll;`;

const modalWindowStyles = `
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
    max-width: 100%;
    height: max-content;
    border: 1px solid var(--theme-border);
    background-color: var(--theme-background);`;

const modalTitleStyles = `
    text-align: center;
    white-space: pre-line;`;

const modalButtonContainerStyles = `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 1rem;
    width: 100%;
    font-size: 1.2rem;`;

 const modalButtonStyles = `
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border: 1px solid var(--theme-border);
    border-radius: 0.25rem;
    color: var(--theme-text);
    background: var(--theme-background);`;

// Contextmenu
const contextMenuBackgroundStyles = `
    position: fixed;
    inset: 0;
    background-color: var(--theme-background-transparent);
    z-index: 100;
    overflow: scroll;`;

const contextMenuContainerStyles = `
    position: absolute;
    display: none;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: max-content;
    font-size: 1.2rem;`;

const contextMenuButton = `
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 1.2rem;
    border: 1px solid var(--theme-border);
    color: var(--theme-text);
    background: var(--theme-background);`;

const modalCloseButtonStyles = `
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    cursor: pointer;
    padding: 0 0.5rem 0.25rem 0.5rem;
    font-size: inherit;
    border: none;
    color: var(--theme-text);
    background: transparent;`;

const calendarButtonStyles = `
    position: absolute;
    top: 3.75rem;
    right: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: .75em;
    border: none;
    color: var(--theme-text);
    border: 1px solid var(--theme-border);
    background: transparent;`;

const modalInputStyles = `
    width: 100%;
    padding: 0.25rem;
    font-size: 1.2rem;
    border: 1px solid var(--theme-border);`;

const modalInputTextAreaStyles = `
    width: 100%;
    padding: 0.25rem;
    font-size: 1.2rem;
    border: 1px solid var(--theme-border); `;
const modalInputCheckboxStyles = ``;

const currentEditorLabelStyles = `
    font-size: 1.2rem;
    color: var(--no);`;
const inputLabelStyles = `
    font-size: 1.2rem;`;
const inLineInputLabelStyles = `
    display: flex;
    align-items: center;
    font-size: 1.2rem;`;
const blockInputLabelStyles = `
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;`;

// Calendar
const calendarContainerStyles = `
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    width: 100%;
    inset: 0;
    flex-grow: 1;
    overflow: scroll;
    border: 1px solid var(--theme-border);
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
    scroll-behavior: smooth;`;
const calendarWeekStyles = `
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: max-content;
    align-items: stretch;
    flex: 1;`;
const calendarDayContainerStyles = `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex-grow: 1;
    flex: 1;
    width: 12vw;
    min-width: 12vw;
    min-height: 8vw;
    overflow-wrap: break-word;
    padding-bottom: 0.5em;
    border-right: 1px solid var(--theme-border);
    border-bottom: 1px solid var(--theme-border);
    font-size: clamp(0.25em, 1.5vw, 1.125em);
    transition: background-color 1s;`;
const calendarDayHeaderStyles = `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: transparent;
    pointer-events: none;`;
const dayNameElementStyles = `
    margin: 0.5rem;
    background: transparent;
    color: var(--theme-grey-text);`;
const dayNumberElementStyles = `
    margin: 0.5rem;
    background: transparent;
    color: var(--theme-grey-text);`;
const eventsContainer = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1px;
    margin-top: auto;
    background: transparent;`
const eventTitleStyles = `
    width: 100%;
    overflow: visible;
    padding: 0 0.25em;
    margin: 0;
    text-align: center;
    color: black;`;
const calendarTooltipStyles = `
    position: absolute;
    display: none;
    width: max-content;
    padding: 0.25em;
    white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
    white-space: -pre-wrap; /* Opera 4 - 6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
    word-wrap: break-word; /* IE 5.5+ */
    font-size: smaller;
    border : 2px solid var(--theme-border);
    border-radius: 0.5em;
    pointer-events: none;
    z-index: 1000;`;

const colorContainerStyles = `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1px;
    width: 100%;`;
const colorSelectBlock = `
    width: 1em;
    height: 1em;
    font-size: 2rem;
    text-align: center;
    color: black;
    cursor: pointer;`;

const jobCardTitleStyles = `
    margin: 0;`;
const jobCardShipDateStyles = `
    margin: 0;`;
const jobCardDueInDaysStyles = `
    margin: 0;`;
const jobCardCheckboxLabelStyles = `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap: 0.25rem`;
const jobCardCheckboxStyles = `
    order: -1;`;


function getLabeledCheckbox(label, isChecked, deletable, containerElement) {
    const checkboxElement = document.createElement('input');
    checkboxElement.setAttribute('type', 'checkbox');
    if (isChecked) checkboxElement.setAttribute('checked', 'checked');
    checkboxElement.style.cssText = jobCardCheckboxStyles;
    checkboxElement.onclick = () => {checkboxLabel.checked = checkboxElement.checked};

    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = label;
    checkboxLabel.style.cssText = jobCardCheckboxLabelStyles;
    checkboxLabel.checked = isChecked;
    if (deletable) {
        checkboxLabel.oncontextmenu = (event) => {
            event.preventDefault();
            showYesNoDialog(`Delete checkbox ${label}?`, () => {
                containerElement.removeChild(checkboxLabel);
            });
        }
    }
    checkboxLabel.appendChild(checkboxElement);
    return checkboxLabel;
}

export function showContextMenu(clickEvent, optionsArray, callback, options) {
    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    const modalWindow = getModalWindow();

    modalBackground.style.background = 'transparent';

    modalWindow.style.cssText = contextMenuContainerStyles;

    if (clickEvent.button !== 2) return; 
    modalWindow.style.display = 'flex';
    modalWindow.style.top = `${clickEvent.clientY}px`;
    modalWindow.style.left = `${clickEvent.clientX}px`;

    modalBackground.onclick = (event) => {
        event.preventDefault();
        body.removeChild(modalBackground);
    }
    modalBackground.oncontextmenu = (event) => {
        event.preventDefault();
        body.removeChild(modalBackground);
    }

    if (options?.title) {
        const modalTitle = document.createElement('label');
        modalTitle.style.textAlign = 'center';
        modalTitle.style.margin = '0.2em';
        modalTitle.textContent = options.title;
        modalWindow.append(modalTitle);
    }
    
    optionsArray.forEach((text) => {
        if (!text) return;
        const optionBtn = getButton(text, () => {
            callback(text);
        });
        optionBtn.style.cssText = contextMenuButton;
        modalWindow.append(optionBtn);
    });
    
    modalBackground.appendChild(modalWindow);
    body.appendChild(modalBackground);
    
    if (modalWindow.childElementCount === 0) body.removeChild(modalBackground);
}


export function showCalendarPreviewDialog(title, calendarEvents, weekdaysOnly, randomColor) {
    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    const modalWindow = getModalWindow();
    modalWindow.style.maxHeight = '95vh';
    modalWindow.style.width = '95vw';
    const modalTitle = getModalTitle(title);

    const calendarContainer = document.createElement('div');
    calendarContainer.style.cssText = calendarContainerStyles;
    calendarContainer.classList.add('calendar-container');

    calendarEvents.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
    });

    // Close button
    const modalCloseButton = getCloseButton(() => {
        body.removeChild(modalBackground);
    });

    loadCalendarContainer(calendarContainer, calendarEvents)

    modalTitle.appendChild(modalCloseButton);
    modalWindow.append(modalTitle, calendarContainer);
    modalBackground.appendChild(modalWindow);
    body.appendChild(modalBackground);

    function loadCalendarContainer(container, calendarEvents) {
        const dateProperties = getDates(calendarEvents);
        const dateIndex = dateProperties.firstSunday;

        console.log(dateProperties);
        // return
        dateIndex.setDate(dateIndex.getDate() - 21);
        const weeks = [];

        calendarEvents.forEach(event => {
            const startDate = getCorrectDate(event.date);
            const dates = [formatDateToCA(startDate)];
            
            while (formatDateToCA(startDate) !== formatDateToCA(event.date)) {
                startDate.setDate(startDate.getDate() + 1);
                dates.push(formatDateToCA(startDate));
            }
            event.dates = dates;
        });

        let endCalender = false;
        while (!endCalender) {
            const weekContainer = document.createElement('div');
            weekContainer.classList.add('week');
            weekContainer.style.cssText = calendarWeekStyles;
        
            // Loop through days of the week
            for (let dayOfTheWeekIndex = 0; dayOfTheWeekIndex < 7; dayOfTheWeekIndex++) {
                const calendarDate = formatDateToCA(dateIndex);
                const dayContainer = document.createElement('div');
                dayContainer.style.cssText = calendarDayContainerStyles;

                const resizeObserver = new ResizeObserver(() => {
                    const screenWidth = window.innerWidth;
                    if (screenWidth <= 600) {
                        dayContainer.style.fontSize = 'large';
                        dayContainer.style.width = '100%';
                        weekContainer.style.flexDirection = 'column';
                    }
                    else {
                        dayContainer.style.fontSize = 'clamp(0.25em, 1.5vw, 1.125em)';
                        dayContainer.style.width = '100%';
                        weekContainer.style.flexDirection = 'row';
                    }
                });
                resizeObserver.observe(document.querySelector('body'));
                
                dayContainer.classList.add(`date-${calendarDate}`);
                dayContainer.classList.add('day');
    
                const dayHeader = document.createElement('div');
                dayHeader.classList.add('day-header-container');
                dayHeader.style.cssText = calendarDayHeaderStyles;
        
                const dayNameElement = document.createElement('p');
                const options = {month: "short"};
                const monthText = (new Intl.DateTimeFormat("en-CA", options).format(dateIndex));
                dayNameElement.classList.add('day-week-name');
                dayNameElement.style.cssText = dayNameElementStyles;
                if (dateIndex.getDate() === 1) {
                    dayNameElement.textContent = monthText;
                    dayNameElement.style.color = 'var(--yes)';
                }
                else {
                    dayNameElement.textContent = dateIndex.toLocaleString('default', {weekday: 'short'});
                }
                if (dateProperties.today.toDateString('en-CA') === dateIndex.toDateString('en-CA')) {
                    dayNameElement.textContent = "Today";
                    dayNameElement.style.color = 'var(--yes)';
                }
        
                const dayNumberElement = document.createElement('p');
                const dayNumber = dateIndex.toLocaleString('default', {day: 'numeric'});
                dayNumberElement.style.cssText = dayNumberElementStyles;
                dayNumberElement.classList.add('day-number');
                if (dateProperties.today.toDateString('en-CA') === dateIndex.toDateString('en-CA')) {
                    dayNumberElement.classList.add('today');
                    dayNumberElement.style.color = 'var(--yes)'
                }
                dayNumberElement.textContent = dayNumber;
    
                // // Add Calender Events
                const eventContainer = document.createElement('div');
                eventContainer.classList.add('events-container');
                eventContainer.style.cssText = eventsContainer;
                
                let eventColor = 0;
                calendarEvents.forEach((calenderEvent) => {
                    const dayName = (dateIndex.toLocaleString('default', {weekday: 'short'}));
                    if ((dayName === "Sat") && (weekdaysOnly)) return;
                    if ((dayName === "Sun") && (weekdaysOnly)) return;

                    eventColor += 1;
                    if (eventColor >= 8) eventColor = 1;
    
                    if (calenderEvent.dates.indexOf(calendarDate) !== -1) {    
                        const eventTitle = document.createElement('p');
                        eventTitle.textContent = calenderEvent.name;
                        eventTitle.style.cssText = eventTitleStyles;
                        if (randomColor) {
                            eventTitle.style.backgroundColor = `var(--theme-background-color-${eventColor || 1})`;
                        }
                        else {
                            eventTitle.style.color = 'var(--theme-text)';
                        }

                        if (calenderEvent.tooltip) {
                            const tooltip = document.createElement('p');
                            tooltip.textContent = calenderEvent.tooltip || "";
                            tooltip.style.cssText = calendarTooltipStyles;
                            tooltip.style.borderColor = randomColor ? `var(--theme-background-color-${eventColor || 1})` : `var(--theme-border)`;
                            eventTitle.onmouseover = () => {
                                tooltip.style.display = "block";
                                if (!randomColor) eventTitle.style.backgroundColor = 'var(--background_hover_theme-text)';
                            }
                            eventTitle.onmousemove = (event) => {
                                const numberOfLines = calenderEvent.tooltip.split(/\r\n|\r|\n/).length;
                                tooltip.style.top = `calc(${event.clientY}px - ${numberOfLines + 2.5}em)`;
                                tooltip.style.left = `${event.clientX}px`;
                            }
                            eventTitle.onmouseleave = () => {
                                tooltip.style.display = "none";
                                if (!randomColor) eventTitle.style.backgroundColor = 'var(--theme-background)';
                            }
                            body.appendChild(tooltip);
                        }
                        eventContainer.appendChild(eventTitle);
                        }
                });
    
                dayHeader.appendChild(dayNameElement);
                dayHeader.appendChild(dayNumberElement);
        
                dayContainer.appendChild(dayHeader);
                dayContainer.appendChild(eventContainer);
        
                weekContainer.appendChild(dayContainer);
    
                // Increment day
                dateIndex.setDate(dateIndex.getDate() + 1);
    
                // Stop looping
                if (formatDateToCA(dateIndex) === formatDateToCA(dateProperties.lastSaturday)) endCalender = true;
            };
            weeks.push(weekContainer);
        }
        container.innerHTML = "";
        container.append(...weeks);
    }

    function getDates(calendarEvents) {
        const events = JSON.parse(JSON.stringify(calendarEvents));
        
        // Sort by end date to find last date
        events.sort((a, b) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0;
        });
        const earliestDate = events[0].date || formatDateToCA(getCorrectDate());
        const latestDate = events[events.length - 1].date || formatDateToCA(getCorrectDate());

        const today = getToday();
        const todayText = formatDateToCA(getToday());
    
        let firstSunday = getCorrectDate(earliestDate);
        // if (firstSunday > getToday()) {
        //     firstSunday = getToday();
        // }
        while (firstSunday.toLocaleString('default', {weekday: 'short'}) !== "Sun") {
            firstSunday.setDate(firstSunday.getDate() - 1);
        }
    
        const lastSaturday = getCorrectDate(latestDate);
        while (lastSaturday.toLocaleString('default', {weekday: 'short'}) !== "Sat") {
            lastSaturday.setDate(lastSaturday.getDate() + 1);
        }
        lastSaturday.setDate(lastSaturday.getDate() + 70);
    
        return {earliestDate, latestDate, todayText, today, firstSunday, lastSaturday}
    }
}

export function showCalendarEventDialog(calendarEvent, OKCallback, cancelCallback, deleteCallback, options) {
    if (!calendarEvent) calendarEvent = {};
    
    if (options) {
        calendarEvent.date = options.date;
    }

    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    const modalWindow = getModalWindow();
    const modalTitle = getModalTitle("Event");

    // Event name
    const eventNameInput = document.createElement('input');
    eventNameInput.style.cssText = modalInputStyles;
    eventNameInput.value = calendarEvent.name || "";
    const eventNameLabel = document.createElement('label');
    eventNameLabel.textContent = "Event Name";
    eventNameLabel.style.cssText = blockInputLabelStyles;
    eventNameLabel.appendChild(eventNameInput);

    // Start Date
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.style.cssText = jobNameInputStyles;
    dateInput.value = calendarEvent.date || "";
    const dateLabel = document.createElement('label');
    dateLabel.textContent = "Start Date ";
    dateLabel.style.cssText = inputLabelStyles;
    dateLabel.appendChild(dateInput);

    // End Date
    const endDateInput = document.createElement('input');
    endDateInput.setAttribute('type', 'date');
    endDateInput.style.cssText = jobNameInputStyles;
    endDateInput.value = calendarEvent.endDate || calendarEvent.date || "";
    const endDateLabel = document.createElement('label');
    endDateLabel.textContent = "End Date ";
    endDateLabel.style.cssText = inputLabelStyles;
    endDateLabel.appendChild(endDateInput);

    // Text
    const TextArea = document.createElement('textarea');
    TextArea.style.cssText = modalInputTextAreaStyles;
    TextArea.style.height = '5rem';
    TextArea.value = calendarEvent.note || "";
    const eventNoteLabel = document.createElement('label');
    eventNoteLabel.textContent = "Note";
    eventNoteLabel.style.cssText = blockInputLabelStyles;
    eventNoteLabel.appendChild(TextArea);

    // Business Closed checkbox
    const ClosedCheckbox = document.createElement('input');
    ClosedCheckbox.setAttribute('type', 'checkbox');
    // checkbox.style.cssText = modalInputCheckboxStyles;
    if (calendarEvent.closed) ClosedCheckbox.setAttribute('checked', 'checked');
    ClosedCheckbox.style.cssText = jobNameInputStyles;
    // checkbox.value = calendarEvent.closed || false;
    const closedCheckboxLabel = document.createElement('label');
    closedCheckboxLabel.textContent = "Closed";
    closedCheckboxLabel.style.cssText = inLineInputLabelStyles;
    closedCheckboxLabel.style.margin = 'auto';
    // closedCheckboxLabel.style.cssText = blockInputLabelStyles;
    closedCheckboxLabel.appendChild(ClosedCheckbox);

    // Color select
    const colorContainer = document.createElement('div');
    colorContainer.style.cssText = colorContainerStyles;
    let selectedColor = calendarEvent.color || 1;
    for (let colorIndex = 1; colorIndex < 8; colorIndex++) {
        const color = document.createElement('div');
        color.style.cssText = colorSelectBlock;
        if (colorIndex == selectedtheme-text) color.textContent = "✓";
        color.style.backgroundColor = `var(--color-${colorIndex})`;
        color.onclick = () => {
            selectedColor = colorIndex;
            for (const colorBlock of colorContainer.children) {
                colorBlock.textContent = "";
            }
            color.textContent = "✓";
        }
        colorContainer.appendChild(theme-text);
    }

    // OK callback
    const modalOKButton = getButton("OK", () => {
        if ((!eventNameInput.value) || (!dateInput.value)) {
            showAlertDialog(
                (eventNameInput.value ? "": "Please add a event name.\n") +
                (dateInput.value ? "": "Please select a date."));
            return;
        }

        calendarEvent.name = eventNameInput.value;
        calendarEvent.date = dateInput.value;
        calendarEvent.endDate = endDateInput.value || dateInput.value;
        calendarEvent.note = TextArea.value;
        calendarEvent.closed = ClosedCheckbox.checked;
        calendarEvent.color = selectedColor;
        
        const correctedDate = getCorrectDateOrder(calendarEvent.date, calendarEvent.endDate);
        calendarEvent.date = correctedDate.start;
        calendarEvent.endDate = correctedDate.end;

        if (OKCallback) OKCallback(calendarEvent);
        body.removeChild(modalBackground);
    });

    // Cancel callback
    const modalCancelButton = getButton("Cancel", () => {
        if (cancelCallback) cancelCallback();
        body.removeChild(modalBackground);
    });

    // Delete callback
    const modalDeleteButton = getButton("Delete", () => {
        if (deleteCallback) deleteCallback(calendarEvent.id);
        body.removeChild(modalBackground);
    });
    modalDeleteButton.onmouseenter = () => {
        modalDeleteButton.style.backgroundColor = "var(--no)";
    }
    modalDeleteButton.style.marginRight = "auto";

    const modalButtonContainer = getButtonContainer(deleteCallback ? modalDeleteButton : "", modalCancelButton, modalOKButton);

    modalWindow.append(modalTitle, eventNameLabel, dateLabel, endDateLabel, eventNoteLabel, closedCheckboxLabel, colorContainer, modalButtonContainer);
    modalBackground.appendChild(modalWindow);
    body.appendChild(modalBackground);
    
    eventNameInput.focus();
}


// Input Dialog
export function showInputDialog(message, defaultText, OKCallback, cancelCallback, inputType, placeholder, options) {
    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    const modalWindow = getModalWindow();
    const modalTitle = getModalTitle(message);

    let modalInput;
    switch (inputType) {
        case 'textarea':
            modalInput = document.createElement('textarea');
            modalInput.style.cssText = modalInputTextAreaStyles;
        break;
        case 'select':
            modalInput = document.createElement('select');
            modalInput.style.cssText = modalInputStyles;
            options.forEach((text) => {
                const option = document.createElement('option');
                option.textContent = text;
                option.value = text;
                modalInput.appendChild(option);
            });
        break;
        case 'date':
            modalInput = document.createElement('input');
            modalInput.style.cssText = modalInputStyles;
            if (inputType) modalInput.setAttribute('type', 'date');
        break;
        case 'time':
            modalInput = document.createElement('input');
            modalInput.style.cssText = modalInputStyles;
            if (inputType) modalInput.setAttribute('type', 'time');
        break;
        case 'number':
            modalInput = document.createElement('input');
            modalInput.style.cssText = modalInputStyles;
            if (inputType) modalInput.setAttribute('type', 'number');
        break;
        // Text is default
        default:
            modalInput = document.createElement('input');
            modalInput.style.cssText = modalInputStyles;
            modalInput.setAttribute('type', 'text');
        break;
    }
    modalInput.value = defaultText;
    if (placeholder) modalInput.setAttribute('placeholder', placeholder);

    const modalOKButton = getButton("OK", () => {
        if (OKCallback) OKCallback(modalInput.value);
        body.removeChild(modalBackground);
    });

    const modalCancelButton = getButton("Cancel", () => {
        if (cancelCallback) cancelCallback(defaultText);
        body.removeChild(modalBackground);
    });

    const modalButtonContainer = getButtonContainer(modalCancelButton, modalOKButton);

    modalWindow.append(modalTitle, modalInput, modalButtonContainer);
    modalBackground.appendChild(modalWindow);
    body.appendChild(modalBackground);

    modalInput.focus();
}

// Alert
export function showAlertDialog(message, okCallback) {
    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    const modalWindow = getModalWindow();
    const modalTitle = getModalTitle(message);
    
    const modalOKButton = getButton("OK", () => {
        if (okCallback) okCallback();
        body.removeChild(modalBackground);
    });

    const modalButtonContainer = getButtonContainer(modalOKButton);

    modalButtonContainer.appendChild(modalOKButton);
    modalWindow.append(modalTitle, modalButtonContainer);
    modalBackground.appendChild(modalWindow);
    body.appendChild(modalBackground);

    // modalOKButton.focus();
}

// Loading
export async function showLoadingDialog(doneCallback, text) {
    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    showWaitingCursor(modalBackground);

    modalBackground.textContent = text || "Loading...";
    
    body.appendChild(modalBackground);
    
    await doneCallback();

    body.removeChild(modalBackground);
}

// Yes/No or Confirm Dialog
export function showYesNoDialog(message, yesCallback, noCallback) {
    const body = document.querySelector('body');
    const modalBackground = getModalBackground();
    const modalWindow = getModalWindow();
    const modalTitle = getModalTitle(message);

    const modalYesButton = getButton("Yes", () => {
        if (yesCallback) yesCallback();
        body.removeChild(modalBackground);
    });

    const modalNoButton = getButton("No", () => {
        if (noCallback) noCallback();
        body.removeChild(modalBackground);
    });

    const modalButtonContainer = getButtonContainer(modalNoButton, modalYesButton);

    modalWindow.append(modalTitle, modalButtonContainer);
    modalBackground.appendChild(modalWindow);
    body.appendChild(modalBackground);
    
    // modalYesButton.focus();
}

export function waitingCursor(waiting) {
    document.querySelector('body').style.cursor = waiting ? "wait" : 'default';
}

export function dialogIsOpen () {
    const openDialogs = document.querySelectorAll('.dialog-is-open');
    return openDialogs.length > 0;
}

function getModalBackground() {
    const background = document.createElement('section');
    background.classList.add('dialog-is-open');
    background.style.cssText = modalBackgroundStyles;
    return background
}

function getModalWindow() {
    const modalWindow = document.createElement('div');
    modalWindow.style.cssText = modalWindowStyles;
    return modalWindow
}

function getModalTitle(message) {
    const title = document.createElement('h2');
    title.style.cssText = modalTitleStyles;
    title.textContent = message;
    return title;
}

function getButton(text, callback) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = modalButtonStyles;
    btn.onclick = callback;
    btn.onmouseover = (event) => {if (!btn.getAttribute('disabled')) btnMouseOver(event)};
    btn.onmouseleave = (event) => {if (!btn.getAttribute('disabled')) btnMouseLeave(event)};
    return btn;
}

function getButtonContainer() {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = modalButtonContainerStyles;
    buttonContainer.append(...arguments);
    return buttonContainer;
}

function getCloseButton(callback) {
    const btn = document.createElement('button');
    btn.textContent = "×";
    btn.style.cssText = modalCloseButtonStyles;
    btn.onclick = callback;
    btn.onmouseover = (event) => {if (!btn.getAttribute('disabled')) btnMouseOver(event)};
    btn.onmouseleave = (event) => {if (!btn.getAttribute('disabled')) btnMouseLeave(event)};
    return btn;
}

function addHoverColors(element) {
    element.onmouseover = () => {
        element.style.color = 'var(--theme-background)';
        element.style.backgroundColor = 'var(--theme-text)';
    }
    element.onmouseleave = () => {
        element.style.color = 'var(--theme-text)';
        element.style.backgroundColor = 'var(--theme-background)';
    }
}

function btnMouseOver(event) {
    event.target.style.color = 'var(--theme-background)';
    event.target.style.backgroundColor = 'var(--theme-text)';
}

function btnMouseLeave(event) {
    event.target.style.color = 'var(--theme-text)';
    event.target.style.backgroundColor = 'var(--theme-background)';
}

function getCorrectDate(date) {
    // Stupid javascript
    const utcDate = new Date(date);
    return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
}

function showWaitingCursor() {
    for (const element of arguments) element.style.cursor = "wait";
}

function stopWaitingCursor() {
    for (const element of arguments) element.style.cursor = "default";
}