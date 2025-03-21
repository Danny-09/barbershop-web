import Image from "next/image"

interface Props {
    w: number;
    h: number;
}

const LogoComponent = ({w, h}: Props) => {
    return <Image
        src="/images/image.png"
        alt="logo legacy"
        width={w}
        height={h}
        className="mx-auto mb-4"
    />

}

export default LogoComponent
