document.addEventListener('DOMContentLoaded', () => {
    
    // Funcionalidade: Mostrar Senha no Cadastro
    const showPasswordCheckbox = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    
    if(showPasswordCheckbox && passwordInput) {
        showPasswordCheckbox.addEventListener('change', function() {
            if(this.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }

    // Funcionalidade: Envio do Formulário de Cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    
    if(cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const phone = document.getElementById('phone').value;

            try {
                const response = await fetch('api/register.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, dob, phone })
                });

                const result = await response.json();

                if(result.status === 'success') {
                    alert('Cadastro realizado com sucesso! Faça login.');
                    window.location.href = 'login.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Erro no cadastro:", error);
                alert("Ocorreu um erro ao conectar com o servidor.");
            }
        });
    }
});