const validateEmployee = (req, res, next) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).render('employees', {
            title: 'Validation Error',
            description: 'Error Adding Employee',
            action: 'form',
            formAction: '', // Relative to the router's base path
            method: 'POST',
            buttonText: 'Add Employee',
            employee: { name, email, age }, // Keep form pre-filled
            errorMessage: 'Please include Employee name, email, and age.',
            basePath: '', // Handled by the router
        });
    }

    next(); 
};

module.exports = validateEmployee;
