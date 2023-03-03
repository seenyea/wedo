export const fontFamily = [
    { name: 'serif', value: 'serif', isSelected: true },
    { name: 'sans-serif', value: 'sans-serif' },
    { name: 'monospace', value: 'monospace' },
    { name: 'cursive', value: 'cursive' },
    { name: 'fantasy', value: 'fantasy' },
    { name: 'system-ui', value: 'system-ui' },
    { name: 'ui-serif', value: 'ui-serif' },
    { name: 'ui-sans-serif', value: 'ui-sans-serif' },
    { name: 'ui-monospace', value: 'ui-monospace' },
    { name: 'ui-rounded', value: 'ui-rounded' },
    { name: 'emoji', value: 'emoji' },
    { name: 'math', value: 'math' },
    { name: 'fangsong', value: 'fangsong' },
];

export const fontStyle = [
    { name: 'normal', value: 'normal', isSelected: true },
    { name: 'italic', value: 'italic' },
    { name: 'oblique', value: 'oblique' },
]

export const fontSize: any[] = [];
for (let i = 8; i < 37;) {
    const o = { name: `${i}`, value: `${i}`, isSelected: i === 8 };
    fontSize.push(o)
    i += 2;
}

export const positions = [
    { name: 'Bottom', value: 'bottom', isSelected: true },
    { name: 'Left', value: 'left' },
    { name: 'Right', value: 'right' },
    { name: 'Top', value: 'top' }
]