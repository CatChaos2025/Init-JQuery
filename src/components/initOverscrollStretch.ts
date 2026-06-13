interface OverscrollOptions {
    selector: string;
    resistance?: number;
}

export function initOverscrollStretch({ selector, resistance = 1800 }: OverscrollOptions): void {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) return;

    el.style.willChange = "transform";

    // --- VARIABLES DE FÍSICA ---
    let currentOverscroll = 0;
    let velocity = 0;          // Velocidad actual del estiramiento
    let rafId: number | null = null;

    // --- CONFIGURACIÓN DEL RESORTE (Ajusta la sensación aquí) ---
    const MAX_STRETCH = 150;   // Permitimos que se estire un poco más
    const STIFFNESS = 0.1;    // Fuerza del resorte (más alto = más duro)
    const DAMPING = 0.82;      // Amortiguación/Fricción (más bajo = más rebote, más alto = más seco)

    const applyStyles = () => {
        const scale = 1 + Math.abs(currentOverscroll) / resistance;
        const translate = currentOverscroll * 0.4; // Multiplicador de desplazamiento visual

        if (currentOverscroll > 0) {
            el.style.transformOrigin = "top";
        } else if (currentOverscroll < 0) {
            el.style.transformOrigin = "bottom";
        }
        el.style.transform = `translateY(${translate}px) scaleY(${scale})`;
    };

    // 🎯 El bucle de físicas corre en la GPU a 60fps+
    const springLoop = () => {
        // Ley de Hooke: la fuerza es proporcional a la distancia del muelle a su punto de reposo (0)
        const springForce = -STIFFNESS * currentOverscroll;
        
        velocity += springForce; // La fuerza altera la velocidad
        velocity *= DAMPING;     // Aplicamos fricción para que no rebote infinitamente
        currentOverscroll += velocity; // La velocidad altera la posición

        applyStyles();

        // Si el resorte ya se quedó quieto en el centro, apagamos el motor
        if (Math.abs(currentOverscroll) < 0.1 && Math.abs(velocity) < 0.1) {
            currentOverscroll = 0;
            velocity = 0;
            el.style.transform = "none";
            rafId = null;
            return;
        }

        rafId = requestAnimationFrame(springLoop);
    };

    const wakeUpSpring = () => {
        if (rafId === null) {
            rafId = requestAnimationFrame(springLoop);
        }
    };

    const handleWheel = (e: WheelEvent) => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollTop <= 0 && e.deltaY < 0) {
            if (e.cancelable) e.preventDefault();
            
            // Subimos la respuesta al tacto inicial (0.20) para que responda más al trackpad
            currentOverscroll -= e.deltaY * 0.20;
            if (currentOverscroll > MAX_STRETCH) currentOverscroll = MAX_STRETCH;
            
            // Inyectamos fuerza cinética directamente a la velocidad
            velocity -= e.deltaY * 0.03;

            applyStyles();
            wakeUpSpring();
        } 
        else if (scrollTop >= maxScroll - 1 && e.deltaY > 0) {
            if (e.cancelable) e.preventDefault();
            
            currentOverscroll -= e.deltaY * 0.20;
            if (currentOverscroll < -MAX_STRETCH) currentOverscroll = -MAX_STRETCH;
            
            velocity -= e.deltaY * 0.03;

            applyStyles();
            wakeUpSpring();
        }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
}