document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnTask1').addEventListener('click', async () => {
        const result = await simulateAsyncTask(2000, "Task 1 Complete");
        displayResult(result);
    });
    document.getElementById('btnTask2').addEventListener('click', async () => {
        const result = await simulateAsyncTask(3000, "Task 2 Complete");
        displayResult(result);
    });
    document.getElementById('btnTask3').addEventListener('click', async () => {
        const result = await simulateAsyncTask(4000, "Task 3 Complete");
        displayResult(result);
    });
    function simulateAsyncTask(delay, result) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(result);
            }, delay);
        });
    }
    function displayResult(message) {
        const taskResultsDiv = document.getElementById('taskResults');
        taskResultsDiv.innerHTML += `<p>${message}</p>`;
    }
});
    
// Author: Bryce Jensenius
// ISU Netid : brycejen@iastate.edu
// Date : 10 / 09 / 2024