
const CircleIcon = ({color = "black"}) => (
    <svg width={40} height={40} viewBox="0 0 40 40">
        <circle
            cx={20}
            cy={20}
            r={14}
            stroke={color}
            strokeWidth={2.2}
            fill={"none"}
        />
    </svg>
)


export default CircleIcon;