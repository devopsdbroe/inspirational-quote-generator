import { useEffect, useState } from "react";

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
import QuoteGeneratorModal from "@/components/QuoteGenerator";

// Assets
import Clouds1 from "@/assets/cloud-and-thunder.png";
import Clouds2 from "@/assets/cloudy-weather.png";
import { Amplify } from "aws-amplify";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import config from "../src/amplifyconfiguration.json";
Amplify.configure(config);
import { generateAQuote, quotesQueryName } from "@/src/graphql/queries";

// Interface for appsync <> lambda JSON response
interface GenerateAQuoteData {
	generateAQuote: {
		statusCode: number;
		headers: { [key: string]: string };
		body: string;
	};
}

// Interface for DynamoDB object
interface UpdateQuoteInfoData {
	id: string;
	queryName: string;
	quotesGenerated: number;
	createdAt: string;
	updatedAt: string;
}

// Type guard for fetch function
function isGraphQLResultForquotesQueryName(
	response: any
): response is GraphQLResult<{
	quotesQueryName: {
		items: [UpdateQuoteInfoData];
	};
}> {
	return (
		response.data &&
		response.data.quotesQueryName &&
		response.data.quotesQueryName.items
	);
}

export default function Home() {
	const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
	const [openGenerator, setOpenGenerator] = useState(false);
	const [processingQuote, setProcessingQuote] = useState(false);
	const [quoteReceived, setQuoteReceived] = useState<String | null>(null);

	const client = generateClient();

	// Function to fetch our DynamoDB object (quotes generated)
	const updateQuoteInfo = async () => {
		try {
			const response = await client.graphql<UpdateQuoteInfoData>({
				query: quotesQueryName,
				authMode: "iam",
				variables: {
					queryName: "LIVE",
				},
			});

			// Create type guards
			if (!isGraphQLResultForquotesQueryName(response)) {
				throw new Error("Unexpected response from API.graphql");
			}

			if (!response.data) {
				throw new Error("Response data is undefined");
			}

			const receivedNumberOfQuotes =
				response.data.quotesQueryName.items[0].quotesGenerated;
			setNumberOfQuotes(receivedNumberOfQuotes);
		} catch (error) {
			console.log("Error getting quote data:", error);
		}
	};

	useEffect(() => {
		updateQuoteInfo();
	}, []);

	// Functions for quote generator modal
	const handleCloseGenerator = () => {
		setOpenGenerator(false);
		setProcessingQuote(false);
		setQuoteReceived(null);
	};

	const handleOpenGenerator = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setOpenGenerator(true);
		setProcessingQuote(true);

		try {
			// Run Lambda function
			const runFunction = "runFunciton";
			const runFunctionStringified = JSON.stringify(runFunction);
			const response = await client.graphql<GenerateAQuoteData>({
				query: generateAQuote,
				authMode: "iam",
				variables: {
					input: runFunctionStringified,
				},
			});
			const responseStringified = JSON.stringify(response);
			const responseReStringified = JSON.stringify(responseStringified);
			const bodyIndex = responseReStringified.indexOf("body=") + 5;
			const bodyAndBase64 = responseReStringified.substring(bodyIndex);
			const bodyArray = bodyAndBase64.split(",");
			const body = bodyArray[0];
			console.log(body);
			setQuoteReceived(body);

			// End state:
			setProcessingQuote(false);

			// Fetch if any new quotes were generated from counter
			updateQuoteInfo();

			// setProcessingQuote(false);
			// setTimeout(() => {
			// 	setProcessingQuote(false);
			// }, 3000);
		} catch (error) {
			console.log("Error generating quote:", error);
			setProcessingQuote(false);
		}
	};

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
				<QuoteGeneratorModal
					open={openGenerator}
					close={handleCloseGenerator}
					processingQuote={processingQuote}
					setProcessingQuote={setProcessingQuote}
					quoteReceived={quoteReceived}
					setQuoteReceived={setQuoteReceived}
				/>

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
						<GenerateQuoteButton onClick={handleOpenGenerator}>
							<GenerateQuoteButtonText>Make a Quote</GenerateQuoteButtonText>
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
