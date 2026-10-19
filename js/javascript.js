document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecciona todos los elementos <li> del menú principal que tienen un submenú (<ul> anidado)
    // El :has(ul) es una pseudo-clase nueva que simplifica la selección.
    // Si tu navegador no la soporta (versiones muy antiguas), puedes usar:
    // document.querySelectorAll('.menu > li').forEach(item => { if (item.querySelector('ul')) { /* ... */ } });
    const menuItemsWithSubmenu = document.querySelectorAll('.menu > li:has(ul)');

    menuItemsWithSubmenu.forEach(item => {
        // Selecciona el enlace directo del ítem principal (ej. el <a> de "Productos")
        const link = item.querySelector('a');

        // 2. Añade un "escuchador de clic" a ese enlace
        link.addEventListener('click', (event) => {
            // Verifica si el clic fue en un ítem que tiene submenú
            if (item.querySelector('ul')) {
                // Impide el comportamiento predeterminado del enlace (ej. navegar a "#")
                event.preventDefault();

                // Alterna la clase 'submenu-open' en el elemento <li> padre.
                // Esta clase es la que activa los estilos CSS para mostrar/ocultar el submenú.
                item.classList.toggle('submenu-open');
            }

            // Opcional: Cierra cualquier otro submenú que esté abierto para evitar múltiples menús abiertos
            menuItemsWithSubmenu.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('submenu-open')) {
                    otherItem.classList.remove('submenu-open');
                }
            });
        });
    });

    // 3. Opcional: Cierra los submenús abiertos cuando el usuario hace clic en cualquier lugar fuera del menú de navegación.
    document.addEventListener('click', (event) => {
        const navElement = document.querySelector('nav'); // Obtén el elemento <nav> completo
        // Si el clic no se originó dentro de la navegación y la navegación existe
        if (navElement && !navElement.contains(event.target)) {
            menuItemsWithSubmenu.forEach(item => {
                item.classList.remove('submenu-open'); // Quita la clase 'submenu-open' de todos los ítems
            });
        }
    });

    // 4. Opcional: Cierra los submenús si el tamaño de la ventana cambia drásticamente (útil al girar un móvil de vertical a horizontal)
    window.addEventListener('resize', () => {
        // Solo cerramos si la pantalla es más grande que nuestro breakpoint móvil para evitar cierres constantes
        if (window.innerWidth > 600) {
            menuItemsWithSubmenu.forEach(item => {
                item.classList.remove('submenu-open');
            });
        }
    });
});