const { exec } = require('child_process');

function fetchProcesses() {
  exec('ps aux --sort=-%mem', (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    const lines = stdout.trim().split('\n').slice(1);
    const tbody = document.getElementById('process-list');
    tbody.innerHTML = '';

    lines.forEach(line => {
      const columns = line.trim().split(/\s+/);
      const row = document.createElement('tr');

      row.innerHTML = `
                <td>${columns[1]}</td>
                <td>${columns[0]}</td>
                <td>${columns[2]}</td>
                <td>${columns[3]}</td>
                <td>${columns.slice(10).join(' ')}</td>
            `;

      tbody.appendChild(row);
    });
  });
}

fetchProcesses();
setInterval(fetchProcesses, 5000); // Refresh every 5 seconds
