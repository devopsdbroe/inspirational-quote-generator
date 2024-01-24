import Image from "next/image";

import Lottie from "react-lottie-player";
import lottieJson from "../../assets/animated-photo.json";
import {
	CenteredLottie,
	DownloadQuoteCardContainer,
	DownloadQuoteCardContainerText,
} from "./AnimationElements";

interface AnimatedDownloadButtonProps {
	handleDownload: () => void;
}

const AnimatedDownloadButton = ({
	handleDownload,
}: AnimatedDownloadButtonProps) => {
	return (
		<DownloadQuoteCardContainer onClick={handleDownload}>
			<CenteredLottie
				loop
				animationData={lottieJson}
				play
			/>
			<DownloadQuoteCardContainerText>
				Download your quote card
			</DownloadQuoteCardContainerText>
		</DownloadQuoteCardContainer>
	);
};

export default AnimatedDownloadButton;
