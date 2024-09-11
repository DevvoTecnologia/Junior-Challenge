import Slider from "react-slick";
import CardRing from "../CardRing/card-ring";

const Carousel = () => {
	return (
		<Slider
			dots
			initialSlide={0}
			speed={500}
			slidesToScroll={4}
			slidesToShow={4}
			pauseOnHover
			autoplay
			responsive={[
				{
					breakpoint: 1536,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 1028,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			]}
		>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
			<CardRing
				name="Narya, o anel do fogo"
				power="Seu portador ganha resistência ao fogo"
				bearer="Gandalf"
				forgedBy="Elfos"
				image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
			/>
		</Slider>
	);
};

export default Carousel;
