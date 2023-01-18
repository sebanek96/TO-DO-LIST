{

    const tasks = [
        {
            content: "posprzątać w domu",
            done: false,
        },
        {
            content: "wstawić zmywarkę",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const clearAndFocusInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {

                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="tasks__button tasks__button--done  js-done">
                ${task.done ? "✔" : ""}
                </button>
                <span class="list__itemText ${task.done ? "tasks__list--done" : ""}">
                        ${task.content}
                </span>
                <button class="tasks__button--remove js-remove">
                🗑️
                </button>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            clearAndFocusInput(newTask);
            return;

        }

        addNewTask(newTaskContent);
        clearAndFocusInput(newTask);
        
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}