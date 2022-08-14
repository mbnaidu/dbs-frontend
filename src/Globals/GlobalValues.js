export const firstTheme = localStorage.getItem('firstTheme') ? localStorage.getItem('firstTheme') : 'rgb(0, 0, 0)';
export const secondTheme = localStorage.getItem('secondTheme') ? localStorage.getItem('secondTheme') : 'rgb(216, 17, 43)';

export const bgColor = `linear-gradient(200deg, ${firstTheme} 0%, ${secondTheme} 50%, ${firstTheme}100%)`;