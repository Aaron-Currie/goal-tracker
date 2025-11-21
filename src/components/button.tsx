export default function button({button, onClick}: {button: {text: string}, onClick: () => void}) {
    return (
        <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={onClick}
            >
            {button.text}
        </button>
    )
}