import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

// Components
import {
	BackgroundImage1,
	BackgroundImage2,
	FooterContainer,
	FooterLink,
	GenerateQuoteButton,
	GenerateQuoteButtonText,
	GradientBackgroundContainer,
	QuoteGeneratorContainer,
	QuoteGeneratorInnerContainer,
	QuoteGeneratorSubtitle,
	QuoteGeneratorTitle,
	RedSpan,
} from "@/components/QuoteGenerator/QuoteGeneratorElements";

// Assets
import Clouds1 from "@/assets/cloud-and-thunder.png";
import Clouds2 from "@/assets/cloudy-weather.png";

export default function Home() {
	const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

	return (
		<>
			<Head>
				<title>Inspiration Quote Generator</title>
				<meta
					name="description"
					content="A fun project to generate quotes"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			{/* Background */}
			<GradientBackgroundContainer>
				{/* Quote Generator Modal Pop-Up */}
				{/* <QuoteGeneratorModal /> */}

				{/* Quote Generator */}
				<QuoteGeneratorContainer>
					<QuoteGeneratorInnerContainer>
						<QuoteGeneratorTitle>
							Daily Inspiration Generator
						</QuoteGeneratorTitle>

						<QuoteGeneratorSubtitle>
							Looking for a splash of inspiration? Generate a quote card with a
							random inspirational quote provided by{" "}
							<FooterLink
								href="https://zenquotes.io/"
								target="_blank"
								rel="noopener noreferrer"
							>
								ZenQuotes API
							</FooterLink>
							.
						</QuoteGeneratorSubtitle>
						<GenerateQuoteButton>
							<GenerateQuoteButtonText onClick={() => {}}>
								Make a Quote
							</GenerateQuoteButtonText>
						</GenerateQuoteButton>
					</QuoteGeneratorInnerContainer>
				</QuoteGeneratorContainer>

				{/* Background Images */}
				<BackgroundImage1
					src={Clouds1}
					height="300"
					alt="cloudybackground1"
				/>
				<BackgroundImage2
					src={Clouds2}
					height="300"
					alt="cloudybackground1"
				/>
				{/* Footer */}
				<FooterContainer>
					<>
						Quotes Generated: {numberOfQuotes}
						<br />
						Developed with <RedSpan>♥</RedSpan> by{" "}
						<FooterLink
							href="https://github.com/devopsdbroe"
							target="_blank"
							rel="noopener noreferrer"
						>
							Daniel Broe
						</FooterLink>
					</>
				</FooterContainer>
			</GradientBackgroundContainer>
		</>
	);
}
