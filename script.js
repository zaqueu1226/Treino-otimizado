document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. TEMA ESCURO =====
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Carregar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ===== 2. PERSISTÊNCIA DOS INPUTS (cargas e checkboxes) =====
    // Seleciona todos os inputs de carga (type="number") e checkboxes
    const loadInputs = document.querySelectorAll('input[data-type="load"]');
    const checkInputs = document.querySelectorAll('input[data-type="check"]');

    // Função para salvar um valor específico
    function saveValue(key, value) {
        localStorage.setItem(key, value);
    }

    // Função para carregar um valor
    function loadValue(key, defaultValue = '') {
        return localStorage.getItem(key) ?? defaultValue;
    }

    // --- Carregar valores salvos ---
    loadInputs.forEach(input => {
        const exId = input.closest('tr').dataset.exid;
        if (!exId) return;
        const key = `load_${exId}`;
        const saved = loadValue(key, input.value);
        input.value = saved;
    });

    checkInputs.forEach(input => {
        const exId = input.closest('tr').dataset.exid;
        if (!exId) return;
        const key = `check_${exId}`;
        const saved = loadValue(key, 'false');
        input.checked = saved === 'true';
    });

    // --- Salvar ao mudar ---
    loadInputs.forEach(input => {
        input.addEventListener('input', () => {
            const exId = input.closest('tr').dataset.exid;
            if (!exId) return;
            const key = `load_${exId}`;
            saveValue(key, input.value);
        });
    });

    checkInputs.forEach(input => {
        input.addEventListener('change', () => {
            const exId = input.closest('tr').dataset.exid;
            if (!exId) return;
            const key = `check_${exId}`;
            saveValue(key, input.checked ? 'true' : 'false');
        });
    });

    // Opcional: botão para resetar todos os dados (caso queira)
    // console.log('Treino carregado com sucesso!');
});