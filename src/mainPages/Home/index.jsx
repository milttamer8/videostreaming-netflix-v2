import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../util/Api';
import { searchByTitle, fetchedCartList, fetchedTrendingVideos, fetchedWatchingVideos, removeFromCart, addToCart } from "../../actions";
import { Link } from 'react-router-dom';
import LoadingRow from '../../components/LoadingRow';
import SlideRow from '../../components/SlideRow';
import AddListIcon from '../../components/icons/AddListIcon';
import CheckedIcon from '../../components/icons/CheckedIcon';
import { uniqueId } from 'lodash';
import { isInvoledAtCart } from '../../util';

class Home extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            data: null,

            cartList: [],
            trendingVideos: [],
            watchingVideos: [],
            searchKey: "",
            isLoading: false,
            isJawOpen: true,
        };
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ isLoading: true });

            const randomID = 1;
            const promise0 = axios.get(`/video/${randomID}`);
            const promise1 = axios.get('/cart');
            const promise2 = axios.get('/state/trending');
            const promise3 = axios.get('/watching');
            Promise.all([promise0, promise1, promise2, promise3]).then((values) => {
                console.log("$$$$$$ api response : ", values);

                this.props.fetchedCartList(values["1"].data.list);
                this.props.fetchedTrendingVideos(values["2"].data.videos);
                this.props.fetchedWatchingVideos(values["3"].data.videos);

                this.setState({
                    isLoading: false,
                    data: values["0"].data.video,
                    trendingVideos: values["2"].data.videos,
                    watchingVideos: values["3"].data.videos,
                });
            })
        }

    }
    onJawHandle = (isOpen) => {
        this.setState({ isJawOpen: isOpen });
    }
    render() {
        const id = 1;       // this is test randome id
        
        console.log(" uniqueId = ", uniqueId());
        const { isLoading, data } = this.state;
        const { cartList, trendingVideos, watchingVideos } = this.props;
        const { isJawOpen } = this.props;
        const result = this.props.searchTitleResult || [];


        const isCarted = isInvoledAtCart(cartList, id);
        return (
            <React.Fragment>
                <div className="mainView" role="main">
                    <div className={`lolomo is-fullbleed${isJawOpen ? " has-open-jaw" : ""}`}>
                        {isLoading ? <LoadingRow /> :
                            <React.Fragment>
                                <h1 className="visually-hidden">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">Netflix Homepage</span>
                                    </span>
                                </h1>
                                <span className="volatile-billboard-animations-container">
                                    <div className="billboard-row" role="region" aria-label="Content">
                                        <div className="ptrack-container billboard-presentation-tracking">
                                            <div className="billboard-presentation-tracking ptrack-content"
                                                data-ui-tracking-context=""
                                                data-tracking-uuid="aade0bc5-06d6-4dae-b9be-f5ec38e39268">
                                                <div className="billboard-presentation-tracking ptrack-content"
                                                    data-ui-tracking-context="%7B%22list_id%22:%221c3e45e9-b6ec-492f-a729-50bcfed971d9_68896063X20XX1592938183794%22,%22location%22:%22homeScreen%22,%22rank%22:0,%22request_id%22:%2265826837-a7f4-406f-a17f-74beaf684a2e-327516955%22,%22row%22:0,%22track_id%22:251884370,%22video_id%22:80095193,%22image_key%22:%22BILLBOARD%7C792c8180-e366-11e9-abfb-12bb0ab1475a%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%221c3e45e9-b6ec-492f-a729-50bcfed971d9_ROOT%22,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D"
                                                    data-tracking-uuid="f707f56b-8c48-43ad-ae8e-4c4249bc0edf">
                                                    <div className="billboard billboard-pane billboard-pane-main billboard-originals full-bleed-billboard trailer-billboard">
                                                        <div className="hero-image-wrapper">
                                                            <img
                                                                className="hero static-image image-layer"
                                                                src="https://occ-0-1009-3934.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABQXHzRQO-Ao-tjt-0gozMee4B-Z9Co4nKYFYf2xAzjrfNIccSo1pbd9QYB4-0FCcbTv2t6i3_eMplXQJz-QLJvuX7K-j.webp?r=1a5"
                                                                // src="https://via.placeholder.com/1280x720?text=1280x720"
                                                                alt="" />
                                                            <div className="trailer-vignette vignette-layer"></div>
                                                            <div className="hero-vignette vignette-layer"></div>
                                                        </div>
                                                        <div className="fill-container">
                                                            <div className="info meta-layer">
                                                                <div className="logo-and-text meta-layer">
                                                                    <div className="titleWrapper">
                                                                        <div className="billboard-title">
                                                                            <img
                                                                                className="title-logo"
                                                                                src="https://occ-0-1009-3934.1.nflxso.net/dnm/api/v6/TsSRXvDuraoJ7apdkH6tsHhf-ZQ/AAAABQcq4jUPE3r7UJwhUAf4r1QUjT2KYSVdSjfuYKvbzfMqjvqKopzK_pIG48Ye-3YR0rSGX60nCHfx2MjXPebAIeOHq_Snc0Bc_j8W.webp?r=455"
                                                                                // src="https://via.placeholder.com/612x260"
                                                                                title="Barbie: Spy Squad"
                                                                                alt="Barbie: Spy Squad" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="info-wrapper">
                                                                        <div className="info-wrapper-fade">
                                                                            <div className="episode-title-container"></div>
                                                                            <div className="synopsis-fade-container">
                                                                                <div className="synopsis no-supplemental">
                                                                                    <span className="v-align-inherit">
                                                                                        <span className="v-align-inherit">
                                                                                            They're gifted gymnasts turned gadget-wielding spies with the skills - and the smarts - to outwit a nimble thief.
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="billboard-links button-layer forward-leaning">
                                                                        <Link data-uia="play-button"
                                                                            aria-label="play" className=" playLink"
                                                                            to={{
                                                                                pathname: `/pr/watch/${id}`,
                                                                                state: data
                                                                            }}>
                                                                            <button className="button-primary medium hasLabel ltr-ublg01" type="button">
                                                                                <div className="icon ltr-1e4713l">
                                                                                    <div className="medium ltr-sar853"
                                                                                        role="presentation">
                                                                                        <svg
                                                                                            viewBox="0 0 24 24">
                                                                                            <path d="M6 4l15 8-15 8z"
                                                                                                fill="currentColor">
                                                                                            </path>
                                                                                        </svg>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ltr-1i33xgl" style={{ width: "calc(0.72rem)" }}></div>
                                                                                <span className="ltr-18i00qw">
                                                                                    <span className="v-align-inherit">
                                                                                        <span className="v-align-inherit">Play</span>
                                                                                    </span>
                                                                                </span>
                                                                            </button>
                                                                        </Link>
                                                                        <button className="button-secondary opacity-60 medium hasLabel ltr-17tayzw"
                                                                            data-uia="billboard-more-info"
                                                                            type="button"
                                                                            onClick={
                                                                                isCarted ?
                                                                                    () => this.props.removeFromCart(id)
                                                                                    : () => this.props.addToCart(id)
                                                                            }>
                                                                            <div className="icon ltr-1e4713l">
                                                                                <div className="medium ltr-sar853"
                                                                                    role="presentation">
                                                                                    {
                                                                                        isCarted ? <CheckedIcon />
                                                                                            : <AddListIcon />
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="ltr-1i33xgl"
                                                                                style={{ width: "calc(0.72rem)" }}></div>
                                                                            <span className="ltr-18i00qw">
                                                                                <span className="v-align-inherit">
                                                                                    <span className="v-align-inherit">
                                                                                        List
                                                                                    </span>
                                                                                </span>
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>

                                {/* my list */}
                                {
                                    cartList && cartList.length ?
                                        <SlideRow r_id={1} title="List" data={cartList} />
                                        : null
                                }

                                {/* most popular */}
                                {
                                    trendingVideos && trendingVideos.length ?
                                        <SlideRow r_id={2} title="Most popular" data={trendingVideos} />
                                        : null
                                }
                                {/* keep watching */}
                                {
                                    watchingVideos && watchingVideos.length ?
                                        <SlideRow r_id={3} title="Keep watching..." data={watchingVideos} />
                                        : null
                                }
                            </React.Fragment>
                        }
                    </div >
                </div >
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ video }) => {
    const { searchTitleResult, isJawOpen, cartList, trendingVideos, watchingVideos } = video;
    return { searchTitleResult, isJawOpen, cartList, trendingVideos, watchingVideos };
}
const mapDispatchToProps = { searchByTitle, fetchedCartList, fetchedTrendingVideos, fetchedWatchingVideos, removeFromCart, addToCart };
export default connect(mapStateToProps, mapDispatchToProps)(Home);