let current_status = null;
let task_to_move = null;   

let active_button = document.querySelector('.status-is-active');
let pending_button = document.querySelector('.status-is-pending');
let closed_button = document.querySelector('.status-is-closed');
let add_button = document.querySelector('.status-add');

let menu_in_active_section = document.querySelector('.main-menu-list-active');
let menu_in_pending_section = document.querySelector('.main-menu-list-pending');
let menu_in_closed_section = document.querySelector('.main-menu-list-closed');

let menu_button_active_section = document.querySelector('.partition-active-button');
let menu_button_pending_section = document.querySelector('.partition-pending-button');
let menu_button_closed_section = document.querySelector('.partition-closed-button');

let active_section = document.querySelector('.section-todo-list-active');
let pending_section = document.querySelector('.section-todo-list-pending');
let closed_section = document.querySelector('.section-todo-list-closed');



function append_element(){
    if (current_status === 'active') {
        create_element(active_section, menu_in_active_section, active_button);
    } else if (current_status === 'pending') {
        create_element(pending_section, menu_in_pending_section, pending_button);
    } else if (current_status === 'closed') {
        create_element(closed_section, menu_in_closed_section, closed_button);
    }
    
}

function create_element(section, menu_nav_section, button){
    let task = document.querySelector('.task').value;
    let start_date = document.querySelector('.start-date').value.split('T').reverse();
    start_date = start_date[0] +' ' + start_date[1].split('-').reverse().join('.');
    let end_date = document.querySelector('.end-date').value.split('T').reverse();
    end_date = end_date[0] +' ' + end_date[1].split('-').reverse().join('.');

    menu_nav_section.classList.remove('visually-hidden');
    let div = document.createElement('div');
    div.className = 'main-background-task-item button black-button';
    section.append(div);

    let ul = document.createElement('ul');
    ul.className = 'main-task-list';
    div.append(ul);

    let li_name = document.createElement('li');
    li_name.className = 'main-task-name';
    li_name.textContent = task;
    ul.append(li_name);

    let li_start_date = document.createElement('li');
    li_start_date.className = 'main-task-start-date center';
    li_start_date.textContent = start_date;
    ul.append(li_start_date);

    let li_end_date = document.createElement('li');
    li_end_date.className = 'main-task-end-date center';
    li_end_date.textContent = end_date;
    ul.append(li_end_date);

    let li_status = document.createElement('li');
    li_status.className = 'main-task-status center';

    let li_status_button = document.createElement('button');
    li_status_button.type = 'button';
    li_status_button.textContent = button.textContent;

    if (current_status === 'active') {
        li_status_button.className = 'main-task-status-button button green-active';
    } else if (current_status === 'pending') {
        li_status_button.className = 'main-task-status-button button yellow-pending';
    } else if (current_status === 'closed') {
        li_status_button.className = 'main-task-status-button button red-closed';
    }

    ul.append(li_status);
    li_status.append(li_status_button);

    let li_edit = document.createElement('li');
    li_edit.className = 'main-edit-item center';
    let li_edit_button = document.createElement('button');
    li_edit_button.type = 'button';
    li_edit_button.className = 'main-edit-item-img';
    ul.append(li_edit);
    li_edit.append(li_edit_button);

    let li_trash = document.createElement('li');
    li_trash.className = 'main-trash-item center';
    let li_trash_button = document.createElement('button');
    li_trash_button.type = 'button';
    li_trash_button.className = 'main-trash-item-img';
    ul.append(li_trash);
    li_trash.append(li_trash_button);
}

function delite_task(section, menu_nav_section) {
    section.addEventListener('click', (event) => {
        if(event.target.classList.contains('main-trash-item-img')){
            const task_item = event.target.closest('.main-background-task-item');
            if(task_item){
                task_item.remove();
            }
        }
        if(section.querySelectorAll('.main-background-task-item').length === 0){
            menu_nav_section.classList.add('visually-hidden');
        }
});
}

function close_or_open_task_in_section(section, menu_nav_section, button, 
    class_button_add, class_button_remove ) {
    const task_item = section.querySelectorAll('.main-background-task-item');
    
    if(task_item[0].classList.contains('visually-hidden')){
        button.classList.add(class_button_add);
        button.classList.remove(class_button_remove);
        menu_nav_section.classList.remove('visually-hidden');
        for(let i = 0; i < task_item.length; i++){
            task_item[i].classList.remove('visually-hidden');
        }
    }else {
        menu_nav_section.classList.add('visually-hidden');
        button.classList.remove(class_button_add);
        button.classList.add(class_button_remove);
        for(let i = 0; i < task_item.length; i++){
             task_item[i].classList.add('visually-hidden');
        }
    }

}

delite_task(active_section, menu_in_active_section);
delite_task(pending_section, menu_in_pending_section);
delite_task(closed_section, menu_in_closed_section);

function remove_task(section) {
    section.addEventListener('click', (event) => {
        if(event.target.classList.contains('main-edit-item-img')){
            task_to_move = event.target.closest('.main-background-task-item');
            // const copy = task_item.cloneNode(true);
            task_to_move.style.border = '2px dashed blue';
            
        }
    })
}

remove_task(active_section);
remove_task(pending_section);
remove_task(closed_section);

active_button.addEventListener('click', () => {
    current_status = 'active';
});
pending_button.addEventListener('click', () => {
    current_status = 'pending';
});
closed_button.addEventListener('click', () => {
    current_status = 'closed';
});
add_button.addEventListener('click', append_element);

menu_button_active_section.addEventListener('click', () => {
    close_or_open_task_in_section(active_section, menu_in_active_section, 
        menu_button_active_section, 'green-active', 'partition-size-clicked');
});
menu_button_pending_section.addEventListener('click', () => {
    close_or_open_task_in_section(pending_section, menu_in_pending_section, 
        menu_button_pending_section, 'yellow-pending', 'partition-size-clicked');
});
menu_button_closed_section.addEventListener('click', () => {
    close_or_open_task_in_section(closed_section, menu_in_closed_section, 
        menu_button_closed_section, 'red-closed', 'partition-size-clicked');
});