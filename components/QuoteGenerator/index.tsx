import { useState, useEffect } from "react";

import { Backdrop, Fade, Modal } from "@mui/material";
import {
	ModalCircularProgress,
	QuoteGeneratorModalContainer,
	QuoteGeneratorModalInnerContainer,
	QuoteGeneratorSubtitle,
	QuoteGeneratorTitle,
} from "./QuoteGeneratorElements";
import ImageBlob from "../animations/ImageBlob";
import { ImageBlobContainer } from "../animations/AnimationElements";
import AnimatedDownloadButton from "../animations/AnimatedDownloadButton";

interface QuoteGeneratorModalProps {
	open: boolean;
	close: () => void;
	processingQuote: boolean;
	setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
	quoteReceived: String | null;
	setQuoteReceived: React.Dispatch<React.SetStateAction<String | null>>;
}

const style = {};

const QuoteGeneratorModal = ({
	open,
	close,
	processingQuote,
	setProcessingQuote,
	quoteReceived,
	setQuoteReceived,
}: QuoteGeneratorModalProps) => {
	const wiseDevQuote = '"If you can center a div, anything is possible"';
	const wiseDevQuoteAuthor = "- a wise senior software engineer";

	const [blobUrl, setBlobUrl] = useState<String | null>(null);

	// Function for handling the download of quote card
	const handleDownload = () => {
		const link = document.createElement("a");

		if (typeof blobUrl === "string") {
			link.href = blobUrl;
			link.download = "quote.png";
			link.click();
		}
	};

	// Function to handle the receiving of quote card

	return (
		<Modal
			id="quoteGeneratorModal"
			aria-labeledby="spring-modal-quotegeneratormodal"
			aria-describedby="spring-modal-opens-and-closes-quote-generator"
			open={open}
			onClose={close}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
		>
			<Fade in={open}>
				<QuoteGeneratorModalContainer sx={style}>
					<QuoteGeneratorModalInnerContainer>
						{/* State #1: Processing request of quote + quote state is empty */}
						{processingQuote === true && quoteReceived === null && (
							<>
								<ModalCircularProgress
									size={"8rem"}
									thickness={2.5}
								/>
								<QuoteGeneratorTitle>
									Creating your quote...
								</QuoteGeneratorTitle>
								<QuoteGeneratorSubtitle style={{ marginTop: "20px" }}>
									{wiseDevQuote}
									<br />
									<span style={{ fontSize: 26 }}>{wiseDevQuoteAuthor}</span>
								</QuoteGeneratorSubtitle>
							</>
						)}

						{/* State #2: Quote state fulfilled */}
						{quoteReceived !== null && (
							<>
								<QuoteGeneratorTitle>Download your quote!</QuoteGeneratorTitle>
								<QuoteGeneratorSubtitle style={{ marginTop: "20px" }}>
									See a preview:
								</QuoteGeneratorSubtitle>
								<ImageBlobContainer>
									<ImageBlob
										quoteReceived={quoteReceived}
										blobUrl={blobUrl}
									/>
								</ImageBlobContainer>
								<AnimatedDownloadButton handleDownload={handleDownload} />
							</>
						)}
					</QuoteGeneratorModalInnerContainer>
				</QuoteGeneratorModalContainer>
			</Fade>
		</Modal>
	);
};

export default QuoteGeneratorModal;
