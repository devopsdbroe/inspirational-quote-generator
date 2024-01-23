import Image from "next/image";

import Lottie from "react-lottie-player";
import lottieJson from "../../assets/animated-photo.json";
import {
	CenteredLottie,
	DownloadQuoteCardContainer,
	DownloadQuoteCardContainerText,
} from "./AnimationElements";

const AnimatedDownloadButton = () => {
	return (
		<DownloadQuoteCardContainer onClick={() => {}}>
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
