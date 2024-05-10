import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../services/services";
import {
  normalizeGuardianData,
  normalizeNYTimesEditorsData,
  normalizeNewsData,
} from "../utils";

const { NewsAPI, GuardianAPI, NYTIMESAPI } = services;

export const fetchEditorsPick = createAsyncThunk(
  "news/fetchEditorsPick",
  async (sourcesState) => {
    try {
      debugger;
      const sources = sourcesState
        .filter((s) => s.id.indexOf("google") === -1)
        .map((s) => s.id)
        .slice(0, 5);
      const newsAPIResponse = await NewsAPI.getEditorsPick(sources.join(","));
      const newsAPIData = newsAPIResponse.data.articles;

      const guardianAPIResponse = await GuardianAPI.getEditorsPick();
      const guardianAPIData = await guardianAPIResponse.data.response.results;

      const NYTimesAPIResponse = await NYTIMESAPI.getEditorsPick();
      const NYTimesAPIData = await NYTimesAPIResponse.data.results;

      const combinedData = [
        ...normalizeNewsData(newsAPIData),
        ...normalizeGuardianData(guardianAPIData),
        ...normalizeNYTimesEditorsData(NYTimesAPIData),
      ];

      // const combinedData = [
      //   {
      //     id: "1715239771066",
      //     title: "North Macedonian elections set to test EU ambitions",
      //     content:
      //       "North Macedonians go to polls to vote in parliamentary and presidential elections that can present a test for the Balkan states European Union ambitions.\r\nThe votes on Wednesday come after Gordana Si… [+2983 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/05/AP24127600073693-1715146019.jpg?resize=1200%2C675",
      //     author: "Al Jazeera",
      //     url: "https://www.aljazeera.com/news/2024/5/8/north-macedonian-elections-set-to-test-eu-ambitions",
      //     pub_date: "2024-05-08T07:20:37Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "US pauses weapons delivery to Israel over Rafah offensive concerns: Reports",
      //     content:
      //       "US President Joe Bidens administration paused a shipment of weapons to Israel last week in opposition to apparent moves by the Israelis to invade the southern Gaza city of Rafah, a senior administrat… [+3630 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/05/2024-05-07T115237Z_1444267295_RC2NL7AYZ1AL_RTRMADP_3_ISRAEL-PALESTINIANS-GAZA-RAFAH-1715132089.jpg?resize=1920%2C1440",
      //     author: "Al Jazeera",
      //     url: "https://www.aljazeera.com/news/2024/5/8/us-pauses-weapons-delivery-to-israel-over-rafah-offensive-concerns-reports",
      //     pub_date: "2024-05-08T05:44:44Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title: "Pakistan bets on a cannabis high as its economy struggles",
      //     content:
      //       "Islamabad, Pakistan When Aamir Dhedhi took his mother to India in 2014 to get treatment for Parkinsons disease, the doctors there advised him to procure cannabidiol (CBD) oil to help her manage her p… [+11692 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-28-at-23.40.18-1714352356.jpeg?resize=1920%2C1440",
      //     author: "Abid Hussain",
      //     url: "https://www.aljazeera.com/news/2024/5/8/pakistan-bets-on-a-cannabis-high-as-its-economy-struggles",
      //     pub_date: "2024-05-08T05:37:34Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "Elon Musk floated robotaxi launch in China, Chinese state media says",
      //     content:
      //       "Elon Musk suggested testing Teslas full self-driving feature in China by deploying it in robotaxis, Chinese state media has reported.\r\nDuring Musks visit to China last month, officials told the Tesla… [+2054 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/05/2024-05-08T021431Z_534870792_RC2C91A4DL8P_RTRMADP_3_TESLA-CHINA-1715141864.jpg?resize=1920%2C1440",
      //     author: "Al Jazeera",
      //     url: "https://www.aljazeera.com/economy/2024/5/8/elon-musk-floated-robotaxi-launch-in-china-chinese-state-media-says",
      //     pub_date: "2024-05-08T05:06:09Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "Storms battering the Midwest bring tornadoes, hail and strong winds",
      //     content:
      //       "DETROIT -- Severe storms barreled through the Midwest, unleashing a curtain of heavy rain, gusty winds and tornadoes throughout the region that forecasters warned could stretch into Wednesday morning… [+3884 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://s.abcnews.com/images/US/abc_news_default_2000x2000_update_16x9_992.jpg",
      //     author:
      //       "ED WHITE Associated Press, ALEXA ST. JOHN Associated Press, SEAN MURPHY Associated Press",
      //     url: "https://abcnews.go.com/US/wireStory/storms-battering-midwest-bring-tornadoes-hail-strong-winds-110016052",
      //     pub_date: "2024-05-08T04:48:41Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "Civil suit settled in shooting of Native American activist at protest of Spanish conquistador statue",
      //     content:
      //       "SANTA FE, N.M. -- A settlement has been reached in a civil lawsuit seeking damages from three relatives in the shooting of a Native American activist in northern New Mexico amid confrontations about … [+2915 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://s.abcnews.com/images/US/abc_news_default_2000x2000_update_16x9_992.jpg",
      //     author: "MORGAN LEE Associated Press",
      //     url: "https://abcnews.go.com/US/wireStory/civil-suit-settled-shooting-native-american-activist-protest-110015426",
      //     pub_date: "2024-05-08T04:18:08Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "House Republicans will turn to K-12 schools in latest antisemitism probe",
      //     content:
      //       "WASHINGTON -- The leaders of three large public school systems will appear before Congress on Wednesday to answer questions about how they have handled incidents of antisemitism on their school campu… [+4156 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://i.abcnewsfe.com/a/e96a0bec-c775-44a4-9c70-d0b5a6623b97/wirestory_acf92208a9ea0ef4878c6ba993ed1d83_16x9.jpg?w=1600",
      //     author: "ANNIE MA Associated Press",
      //     url: "https://abcnews.go.com/US/wireStory/house-republicans-turn-12-schools-latest-antisemitism-probe-110015781",
      //     pub_date: "2024-05-08T04:17:56Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title: "US cancels export licenses of suppliers to China’s Huawei",
      //     content:
      //       "The United States has revoked some licenses that allow companies to ship goods, such as chips, to sanctioned Chinese telecommunications equipment maker Huawei Technologies.\r\nSome companies were notif… [+3232 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/03/2021-06-23T213734Z_2018083332_RC2J6O9U7F43_RTRMADP_3_HUAWEI-5G-1-1709274412.jpg?resize=1920%2C1440",
      //     author: "Al Jazeera",
      //     url: "https://www.aljazeera.com/economy/2024/5/8/us-cancels-export-licenses-of-suppliers-to-chinas-huawei",
      //     pub_date: "2024-05-08T03:33:14Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "Op shops report major spike in customers amid cost of living pressure, drive to sustainability",
      //     content:
      //       "<ul><li>In short: Op shop chain Vinnies has seen over a 50 per cent increase in sales in the past financial year.</li><li>In Victoria, 34 per cent more customers visited stores for second hand clothi… [+4618 chars]",
      //     source: {
      //       id: "abc-news-au",
      //       name: "ABC News (AU)",
      //     },
      //     img: "https://live-production.wcms.abc-cdn.net.au/4c268881d63694a8bb0bf58f6e29304d?impolicy=wcms_watermark_news&cropH=1087&cropW=1934&xPos=0&yPos=7&width=862&height=485&imformat=generic",
      //     author: "Jason Katsaras",
      //     url: "https://www.abc.net.au/news/2024-05-08/australians-turning-to-op-shops-in-cost-of-living-crisis/103809766",
      //     pub_date: "2024-05-08T02:17:20Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "‘Bleak milestone’: UN says 3 million forced to flee in Myanmar conflict",
      //     content:
      //       "The number of people in Myanmar forced from their homes by conflict now exceeds more than 3 million in what the United Nations has described as a bleak milestone for the country.\r\nThe UN said the num… [+3246 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/05/2023-11-27T085614Z_551881145_RC2SC4AATIN0_RTRMADP_3_MYANMAR-VIOLENCE-1715132586.jpg?resize=1920%2C1440",
      //     author: "Al Jazeera",
      //     url: "https://www.aljazeera.com/news/2024/5/8/bleak-milestone-un-says-3-million-forced-to-flee-in-myanmar-conflict",
      //     pub_date: "2024-05-08T02:04:36Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "Newcastle's Super Hubert on keeping his magic alive after more than 40 years",
      //     content:
      //       "The lights go up and a man appears on stage wearing a black tuxedo.\r\nEverything seems normal, except his top hat, gloves and the fly of his pants are on fire.\r\nReacting quickly, he somehow swallows t… [+3670 chars]",
      //     source: {
      //       id: "abc-news-au",
      //       name: "ABC News (AU)",
      //     },
      //     img: "https://live-production.wcms.abc-cdn.net.au/0674b9701d58011a5375e678854b6235?impolicy=wcms_watermark_news&cropH=674&cropW=1197&xPos=3&yPos=0&width=862&height=485&imformat=generic",
      //     author: "Laurise Dickson",
      //     url: "https://www.abc.net.au/news/2024-05-08/super-hubert-magician-newcastle-new-south-wales-comedy/103810100",
      //     pub_date: "2024-05-08T01:03:48Z",
      //   },
      //   {
      //     id: "1715239771066",
      //     title:
      //       "Israel’s war on Gaza live: Calls for Israel to open border crossings grow",
      //     content:
      //       "blinking-dot\r\nLive updatesLive updates, \r\nAid trucks mass at Gaza crossings while the UN warns closure of Rafah border makes disastrous humanitarian situation worse.",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/05/2024-05-06T194110Z_1158660249_RC24L7AE45S4_RTRMADP_3_ISRAEL-PALESTINIANS-HAMAS-AGREEMENT-1715111634.jpg?resize=1920%2C1440",
      //     author: "Alastair McCready",
      //     url: "https://www.aljazeera.com/news/liveblog/2024/5/8/israels-war-on-gaza-live-calls-for-israel-to-open-border-crossings-grow",
      //     pub_date: "2024-05-08T00:00:45Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Education Secretary Cardona condemns antisemitism at House hearing",
      //     content:
      //       "Education Secretary Miguel Cardona faced a barrage of questions on antisemitism and college protests during a more than three-hour hearing on Capitol Hill on Tuesday, but repeatedly condemned all for… [+2940 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://i.abcnewsfe.com/a/a3440bbc-2913-478c-b68f-40d7f63f8720/Cardona-ap-er-240507_1715116178541_hpMain_2_16x9.jpg?w=1600",
      //     author: "Arthur Jones II",
      //     url: "https://abcnews.go.com/Politics/education-secretary-cardona-condemns-antisemitism-house-hearing/story?id=110006837",
      //     pub_date: "2024-05-07T22:08:00Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Proud traditions of cake making and baking in Australia stretch back thousands of years",
      //     content:
      //       "Cake is not just an irresistibly delicious treat  it's also an excellent way to trace Australia's history.\r\nFrom ancient First Nations traditions to cooking under war rations, Women's Weekly birthday… [+6455 chars]",
      //     source: {
      //       id: "abc-news-au",
      //       name: "ABC News (AU)",
      //     },
      //     img: "https://live-production.wcms.abc-cdn.net.au/dbc221dfca2a4a399d636c1a2bbd6884?impolicy=wcms_watermark_news&cropH=506&cropW=900&xPos=0&yPos=55&width=862&height=485&imformat=generic",
      //     author: "Anna Kelsey-Sugg, Bec Zajac",
      //     url: "https://www.abc.net.au/news/2024-05-08/cake-baking-history-in-australia-indigenous-traditions-to-today/103773000",
      //     pub_date: "2024-05-07T22:00:00Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "Panera drops controversial Charged Lemonade from drink menu",
      //     content:
      //       "Fast casual restaurant chain Panera Bread is doing away with highly caffeinated Charged Lemonade drinks that have been at the center of multiple wrongful death lawsuits since last fall.\r\nA spokespers… [+2554 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://i.abcnewsfe.com/a/07c8adb8-4f09-45bb-b76e-6291ee933952/panera-2-gty-bb-240507_1715102811207_hpMain_16x9.jpg?w=1600",
      //     author: "Kelly McCarthy, Melanie Schmitz",
      //     url: "https://abcnews.go.com/GMA/Food/panera-drops-controversial-charged-lemonade-drink-menu/story?id=109999992",
      //     pub_date: "2024-05-07T21:46:00Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Sikh leaders welcome arrests in Canada activist killing, but questions loom",
      //     content:
      //       "Montreal, Canada Sikh leaders in North America have welcomed recent arrests in the killing of Canadian Sikh activist Hardeep Singh Nijjar, but allegations that the Indian government was involved cont… [+10411 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2023/09/2023-09-20T234010Z_1525467680_RC2NC3A3ZNAQ_RTRMADP_3_CANADA-INDIA-1695395129.jpg?resize=1920%2C1440",
      //     author: "Jillian Kestler-D'Amours",
      //     url: "https://www.aljazeera.com/news/2024/5/7/sikh-leaders-welcome-arrests-in-canada-activist-killing-but-questions-loom",
      //     pub_date: "2024-05-07T21:40:19Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Man who pulled gun on pastor charged with homicide after cousin found dead: Police",
      //     content:
      //       "A man who pulled a gun on a pastor at a Pennsylvania church Sunday has been charged with homicide after his cousin was found shot to death, according to the Allegheny County Police.\r\nThis is a develo… [+41 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://s.abcnews.com/images/General/Breaking-News-banner-abc-ps-181024_hpMain_16x9_992.jpg?w=1600",
      //     author: "Julia Reinstein",
      //     url: "https://abcnews.go.com/US/man-pulled-gun-pastor-charged-homicide-after-cousin/story?id=110008233",
      //     pub_date: "2024-05-07T21:36:39Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Body of 6th construction worker killed in Key Bridge collapse recovered",
      //     content:
      //       "The body of the sixth and final missing victim killed in the Baltimore Francis Scott Key Bridge collapse has been recovered, authorities said Tuesday.\r\nJosé Mynor López, 37, of Baltimore, was located… [+875 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://i.abcnewsfe.com/a/02818585-41ee-48a3-bd26-630574ddecdf/baltimore-bridge-1-ap-dp-240328_1711655373663_hpMain_2_16x9.jpg?w=1600",
      //     author: "Meredith Deliso",
      //     url: "https://abcnews.go.com/US/body-6th-construction-worker-killed-baltimore-key-bridge/story?id=110003859",
      //     pub_date: "2024-05-07T21:32:00Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Judge delays Donald Trump's classified documents trial indefinitely",
      //     content:
      //       "The judge overseeing former President Donald Trump's classified documents case has now indefinitely postponed the trial date pending resolution of outstanding pretrial litigation, including disagreem… [+1568 chars]",
      //     source: {
      //       id: "abc-news",
      //       name: "ABC News",
      //     },
      //     img: "https://i.abcnewsfe.com/a/ec015d61-513b-4731-b51f-dfb318c022ab/trump-2-ap-er-221011_1665524210672_hpMain_16x9.jpg?w=1600",
      //     author: "Katherine Faulders",
      //     url: "https://abcnews.go.com/Politics/judge-delays-donald-trumps-classified-documents-trial-indefinitely/story?id=110006887",
      //     pub_date: "2024-05-07T21:21:00Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "‘Desperate’ rescues under way as Brazil floods kill 90, displace thousands",
      //     content:
      //       "Rescuers are rushing to evacuate people stranded by floodwaters across the southern Brazilian state of Rio Grande do Sul, where at least 90 people have been killed and more than 130 others are missin… [+3698 chars]",
      //     source: {
      //       id: "al-jazeera-english",
      //       name: "Al Jazeera English",
      //     },
      //     img: "https://www.aljazeera.com/wp-content/uploads/2024/05/2024-05-07T022924Z_356450739_RC29L7ALLEO2_RTRMADP_3_BRAZIL-RAINS-1715111583.jpg?resize=1920%2C1440",
      //     author: "Al Jazeera",
      //     url: "https://www.aljazeera.com/news/2024/5/7/desperate-rescues-under-way-as-brazil-floods-kill-90-displace-thousands",
      //     pub_date: "2024-05-07T21:15:17Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "Nadhim Zahawi to stand down as MP at next general election",
      //     content:
      //       "MP for Stratford-on-Avon and former chancellor and Conservative party chair will not seek re-election",
      //     source: {
      //       id: "uk-news",
      //       name: "UK news",
      //     },
      //     img: "https://media.guim.co.uk/431442b376b45ff258a4a41abf139d0c37183e4f/163_63_1693_1016/500.jpg",
      //     contributor: "Ben Quinn",
      //     url: "https://www.theguardian.com/uk-news/article/2024/may/09/nadhim-zahawi-stand-down-mp-next-general-election",
      //     pub_date: "2024-05-09T07:29:08Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Israel-Gaza war live: Biden warns Israel if it goes into Rafah, ‘I’m not supplying the weapons’",
      //     content:
      //       "The US president tells CNN he has made it clear to Benjamin Netanyahu that a major offensive on the Gaza city would mean a halt to more weapons shipments",
      //     source: {
      //       id: "world",
      //       name: "World news",
      //     },
      //     img: "https://media.guim.co.uk/fc642a4d762d6c20df968b56ce7c3fa1b5e5e485/0_224_6720_4032/500.jpg",
      //     contributor: "Amy Sedghi",
      //     url: "https://www.theguardian.com/world/live/2024/may/09/israel-gaza-live-updates-biden-warns-us-will-halt-more-weapons-shipments-to-israel-if-major-rafah-offensive-launched",
      //     pub_date: "2024-05-09T07:26:32Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Australia news live: Faruqi v Hanson: Greens senator applies for court case to be re-opened; Labor gas plan sparks backlash",
      //     content: "Follow live",
      //     source: {
      //       id: "australia-news",
      //       name: "Australia news",
      //     },
      //     img: "https://media.guim.co.uk/993d1b9efba6df2532905d37a09305149c23335e/0_260_5472_3283/500.jpg",
      //     contributor: "Emily Wind",
      //     url: "https://www.theguardian.com/australia-news/live/2024/may/09/penny-wong-israel-rafah-labor-gas-strategy-budget-anthony-albanese-peter-dutton-coalition",
      //     pub_date: "2024-05-09T07:24:36Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Bank of England expected to leave interest rates on hold today – business live",
      //     content: "Rolling coverage of the latest economic and financial news",
      //     source: {
      //       id: "business",
      //       name: "Business",
      //     },
      //     img: "https://media.guim.co.uk/7391d49a1d50054c31c6240ad62ff4abeebb20b4/0_128_3315_1989/500.jpg",
      //     contributor: "Graeme Wearden",
      //     url: "https://www.theguardian.com/business/live/2024/may/09/bank-of-england-expected-interest-rates-on-hold-cut-inflation-wages-business-live",
      //     pub_date: "2024-05-09T07:16:17Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Afternoon Update: Labor’s gas plan labelled ‘morally bankrupt’; China accuses Australia of ‘spying’; and Trump’s son’s new role",
      //     content:
      //       "Strategy argues fossil fuel is an important part of the transition to net zero emissions",
      //     source: {
      //       id: "australia-news",
      //       name: "Australia news",
      //     },
      //     img: "https://media.guim.co.uk/b4af0387928e0e263c1ff48a581694cff5aa9661/717_535_4896_2938/500.jpg",
      //     contributor: "Mike Hohnen",
      //     url: "https://www.theguardian.com/australia-news/article/2024/may/09/afternoon-update-labors-morally-bankrupt-gas-strategy-china-accuses-australia-of-spying-and-a-health-issue-caused-by-a-dead-worm-ntwnfb",
      //     pub_date: "2024-05-09T07:08:09Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Malaysia plans to give orangutans to countries that buy palm oil",
      //     content:
      //       "‘Orangutan diplomacy’ strategy aims to ease concern over environmental impact of palm oil production, says minister",
      //     source: {
      //       id: "world",
      //       name: "World news",
      //     },
      //     img: "https://media.guim.co.uk/e9ce9062cb2a8ee00be7bf8ed872bf49c2f64eba/486_865_4657_2794/500.jpg",
      //     contributor: "Rebecca Ratcliffe",
      //     url: "https://www.theguardian.com/world/article/2024/may/09/malaysia-plans-give-orangutans-gifts-countries-buy-palm-oil",
      //     pub_date: "2024-05-09T07:07:58Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Mother of the Bride review – Brooke Shields leads middling Netflix mush",
      //     content:
      //       "More background fluff from the streamer, this time from Mean Girls director Mark Waters with a splashy Thailand location",
      //     source: {
      //       id: "film",
      //       name: "Film",
      //     },
      //     img: "https://media.guim.co.uk/5b2e1a89aab224265085060e6c8b94e668c2cb0a/0_400_6000_3600/500.jpg",
      //     contributor: "Benjamin Lee",
      //     url: "https://www.theguardian.com/film/article/2024/may/09/mother-of-the-bride-review-netflix-comedy-brooke-shields",
      //     pub_date: "2024-05-09T07:01:42Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Bottoms up! The joyfully lewd art of Beryl Cook and Tom of Finland",
      //     content:
      //       "Once dismissed as bawdy kitsch, the two artists’ work has found a new generation of fans. A new exhibition celebrates their embrace of sexual liberation – and some ‘amazing bums’",
      //     source: {
      //       id: "artanddesign",
      //       name: "Art and design",
      //     },
      //     img: "https://media.guim.co.uk/651047212838f278b5a30c44afaac2b9ff83ea3a/0_0_3746_2248/500.jpg",
      //     contributor: "Nicholas Wroe",
      //     url: "https://www.theguardian.com/artanddesign/article/2024/may/09/art-beryl-cook-and-tom-of-finland-studio-voltaire",
      //     pub_date: "2024-05-09T07:00:44Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Stormy Daniels to return to stand for second day of testimony at Trump trial",
      //     content:
      //       "Adult film star will continue to be cross-examined by Trump’s legal team after prosecutors drew out details of alleged affair",
      //     source: {
      //       id: "us-news",
      //       name: "US news",
      //     },
      //     img: "https://media.guim.co.uk/637196747f097d91825e93544e5b8a24d5c5fe50/0_0_5000_3000/500.jpg",
      //     url: "https://www.theguardian.com/us-news/article/2024/may/09/trump-trial-stormy-daniels-continue-testimony",
      //     pub_date: "2024-05-09T07:00:43Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Selling off the summer? Why Hundred plans should matter to all cricket lovers | Barney Ronay",
      //     content:
      //       "The ECB’s proposals to invite private investment into its divisive tournament require further scrutiny with the wider game at stake",
      //     source: {
      //       id: "sport",
      //       name: "Sport",
      //     },
      //     img: "https://media.guim.co.uk/d46ae103d6a7df5ceddbf276ea558d51ed563de0/0_16_5444_3266/500.jpg",
      //     contributor: "Barney Ronay",
      //     url: "https://www.theguardian.com/sport/blog/article/2024/may/09/selling-off-summer-why-plans-for-hundred-should-matter-to-all-cricket-lovers",
      //     pub_date: "2024-05-09T07:00:42Z",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Turning Point or Breaking Point? Biden’s Pause on Weapons Tests Ties to Israel.",
      //     content:
      //       "President Biden hopes the decision to withhold the delivery of 3,500 bombs will prompt Israel to change course in its war in Gaza.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08dc-prexy-plwz/08dc-prexy-plwz-threeByTwoSmallAt2X.jpg",
      //     author: "Peter Baker",
      //     url: "https://www.nytimes.com/2024/05/08/us/politics/biden-bombs-israel.html",
      //     pub_date: "2024-05-09T01:15:32-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "A Satellite View of Israel’s New Front in Gaza",
      //     content:
      //       "Widespread damage, flattened structures and clusters of Israeli tanks were seen in eastern Rafah after Israel’s incursion.",
      //     source: {
      //       id: "world",
      //       name: "world",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/2024-05-08-rafah-sat-index/2024-05-08-rafah-sat-index-threeByTwoSmallAt2X-v6.jpg",
      //     author: "Lauren Leatherby, Bora Erden and Elena Shao",
      //     url: "https://www.nytimes.com/interactive/2024/05/08/world/middleeast/israel-incursion-rafah-satellite-image-map.html",
      //     pub_date: "2024-05-08T17:35:56-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Johnson Survives Greene’s Ouster Attempt as Democrats Join G.O.P. to Kill It",
      //     content:
      //       "Republicans and Democrats banded together to block a motion by the right-wing Georgia congresswoman to remove the speaker.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08dc-johnson-jwvc/08dc-johnson-jwvc-threeByTwoSmallAt2X.jpg",
      //     author: "Catie Edmondson, Carl Hulse and Kayla Guo",
      //     url: "https://www.nytimes.com/2024/05/08/us/politics/greene-johnson-vacate.html",
      //     pub_date: "2024-05-08T23:16:19-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "House Vote Count: How Speaker Mike Johnson Survived Motion on Ousting",
      //     content:
      //       "Republicans and Democrats voted Wednesday to block a motion that sought to remove the speaker of the House.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/2024-05-08-house-speaker-vacate-vote-index/2024-05-08-house-speaker-vacate-vote-index-threeByTwoSmallAt2X.jpg",
      //     author: "The New York Times",
      //     url: "https://www.nytimes.com/interactive/2024/05/08/us/politics/house-vote-speaker-johnson.html",
      //     pub_date: "2024-05-08T20:41:31-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "House Republicans Clash With Leaders of Public Schools Over Antisemitism Claims",
      //     content:
      //       "Politicians said educators had not done enough. But the New York chancellor said members were trying to elicit “gotcha moments” rather than stop antisemitism.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08k12-antisemitism-leadall3-cjzq/08k12-antisemitism-leadall3-cjzq-threeByTwoSmallAt2X.jpg",
      //     author: "Dana Goldstein, Troy Closson and Michael Levenson",
      //     url: "https://www.nytimes.com/2024/05/08/us/house-gop-public-school-leaders-antisemitism.html",
      //     pub_date: "2024-05-08T23:13:59-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "4 Takeaways as School Leaders Battle Charges of Tolerating Antisemitism",
      //     content:
      //       "At a hearing in Congress, public school leaders from New York, California and Maryland forcefully buffed Republican attacks, drawing a contrast with university presidents.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/0812k-update-promo-1215-vtkg/0812k-update-promo-1215-vtkg-threeByTwoSmallAt2X-v2.jpg",
      //     author: "Jacey Fortin",
      //     url: "https://www.nytimes.com/2024/05/08/us/antisemitism-hearing-house-schools.html",
      //     pub_date: "2024-05-08T15:20:56-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "U.S.C. President Censured by Academic Senate After Weeks of Turmoil",
      //     content:
      //       "Carol Folt had been under fire for canceling a valedictorian’s speech and calling in the police, who cleared an encampment arrested dozens of protesters.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08nat-usc-censure-gbqf/08nat-usc-censure-gbqf-threeByTwoSmallAt2X.jpg",
      //     author: "Shawn Hubler, Stephanie Saul and Jill Cowan",
      //     url: "https://www.nytimes.com/2024/05/08/us/university-of-southern-california-carol-folt-censure.html",
      //     pub_date: "2024-05-08T23:13:57-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "U.C.L.A. Protesters Had Metal Pipes and ‘Occupation Guide,’ Police Say",
      //     content:
      //       "More than 40 people were arrested Monday on suspicion of conspiracy to commit a crime, according to the police department at the University of California, Los Angeles.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08nat-ucla-police-vgmc/08nat-ucla-police-vgmc-threeByTwoSmallAt2X.jpg",
      //     author: "Jonathan Wolfe",
      //     url: "https://www.nytimes.com/2024/05/08/us/ucla-activist-arrest-pipes.html",
      //     pub_date: "2024-05-08T20:59:43-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Antiwar Protest Camp in Dublin Is Dismantled After College Agrees to Divest",
      //     content:
      //       "Students against the war in Gaza began taking down the camp after Trinity College Dublin said it would divest from three Israeli companies.",
      //     source: {
      //       id: "world",
      //       name: "world",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08ireland-fvkm/08ireland-fvkm-threeByTwoSmallAt2X.jpg",
      //     author: "Ed O’Loughlin",
      //     url: "https://www.nytimes.com/2024/05/08/world/europe/ireland-trinity-college-protests.html",
      //     pub_date: "2024-05-08T18:22:43-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "But How Does the Worm Get in Your Brain?",
      //     content: "And other questions about parasites.",
      //     source: {
      //       id: "well",
      //       name: "well",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/well/08WELL-PARASITE-EXPLAINER2/08WELL-PARASITE-EXPLAINER2-threeByTwoSmallAt2X.jpg",
      //     author: "Dana G. Smith and Dani Blum",
      //     url: "https://www.nytimes.com/2024/05/08/well/live/brain-worm-parasites-rfk-jr.html",
      //     pub_date: "2024-05-08T17:44:41-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "R.F.K. Jr. Says Doctors Found a Dead Worm in His Brain",
      //     content:
      //       "The presidential candidate has faced previously undisclosed health issues, including a parasite that he said ate part of his brain.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/05/multimedia/00rfk-health-1-bzqj/00rfk-health-1-bzqj-threeByTwoSmallAt2X.jpg",
      //     author: "Susanne Craig",
      //     url: "https://www.nytimes.com/2024/05/08/us/rfk-jr-brain-health-memory-loss.html",
      //     pub_date: "2024-05-08T23:49:13-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "What Happens When a Happening Place Becomes Too Hot",
      //     content:
      //       "City officials worked to make Milan attractive to visitors, but now that some neighborhoods are overwhelmed by rowdy crowds and noise, they’re trying to scale back.",
      //     source: {
      //       id: "world",
      //       name: "world",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/09/multimedia/09milan-nightlife-promo/09milan-nightlife-01-vpjq-threeByTwoSmallAt2X.jpg",
      //     author: "Elisabetta Povoledo and Alessandro Grassani",
      //     url: "https://www.nytimes.com/2024/05/09/world/europe/milan-nightlife-crowd-control.html",
      //     pub_date: "2024-05-09T02:40:17-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "I Asked South Dakota Dog Trainers About Kristi Noem",
      //     content:
      //       "The governor defends her story of killing her dog, but not everyone in her home state does.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08pol-on-politics-newsletter-topart-jbfp/08pol-on-politics-newsletter-topart-jbfp-threeByTwoSmallAt2X.jpg",
      //     author: "Jess Bidgood",
      //     url: "https://www.nytimes.com/2024/05/08/us/politics/dog-trainers-kristi-noem.html",
      //     pub_date: "2024-05-08T23:23:01-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Pro-Trump PAC Joins TikTok Amid Fight Over Its Chinese Ownership",
      //     content:
      //       "President Biden, whose presidential campaign uses the app, signed a law in April that would force a sale of TikTok by ByteDance.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08pol-swiper-trump-tiktok-01-tjzq/08pol-swiper-trump-tiktok-01-tjzq-threeByTwoSmallAt2X.jpg",
      //     author: "Chris Cameron",
      //     url: "https://www.nytimes.com/2024/05/08/us/politics/trump-pac-tiktok.html",
      //     pub_date: "2024-05-08T21:56:29-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Apple’s New iPad Ad Leaves Its Creative Audience Feeling … Flat",
      //     content:
      //       "An ad meant to show how the updated device can do many things has become a metaphor for a community’s fears of the technology industry.",
      //     source: {
      //       id: "business",
      //       name: "business",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08APPLE-IPAD-qphl/08APPLE-IPAD-qphl-threeByTwoSmallAt2X.jpg",
      //     author: "Tripp Mickle",
      //     url: "https://www.nytimes.com/2024/05/08/business/apple-ipad-crush-ad.html",
      //     pub_date: "2024-05-08T19:47:38-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "The Tiny Nation at the Vanguard of Mining the Ocean Floor",
      //     content:
      //       "Below the waters of the Cook Islands, population 15,000, lie minerals used to power electric cars. Extracting them could bring riches, but many say it’s a bad idea.",
      //     source: {
      //       id: "world",
      //       name: "world",
      //     },
      //     img: "https://static01.nyt.com/images/2024/04/25/world/00cookislands/00cookislands-threeByTwoSmallAt2X.jpg",
      //     author: "Pete McKenzie",
      //     url: "https://www.nytimes.com/2024/05/09/world/asia/cook-islands-seabed-mining.html",
      //     pub_date: "2024-05-09T02:39:54-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Judge’s Decisions in Documents Case Play Into Trump’s Delay Strategy",
      //     content:
      //       "Judge Aileen Cannon has given sober consideration to arguments that some experts say should have been promptly dispensed with, leaving a backlog of pretrial issues without a trial date in sight.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08dc-trump-documents-tqvj/08dc-trump-documents-tqvj-threeByTwoSmallAt2X.jpg",
      //     author: "Alan Feuer",
      //     url: "https://www.nytimes.com/2024/05/08/us/politics/trump-documents-judge-cannon.html",
      //     pub_date: "2024-05-08T23:55:23-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "The Words That Defined This Week in Donald J. Trump’s Trial",
      //     content:
      //       "Stormy Daniels, Hope Hicks and the defendant himself uttered memorable phrases in the last week of testimony.",
      //     source: {
      //       id: "nyregion",
      //       name: "nyregion",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08trump-moments-01-flbk/08trump-moments-01-flbk-threeByTwoSmallAt2X.jpg",
      //     author: "Wesley Parnell",
      //     url: "https://www.nytimes.com/2024/05/08/nyregion/trump-hush-money-trial-key-moments.html",
      //     pub_date: "2024-05-08T16:08:16-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Young Voters Aren’t Happy With Biden. But Will They Abandon Him?",
      //     content:
      //       "The president’s complicated relationship with a key demographic.",
      //     source: {
      //       id: "opinion",
      //       name: "opinion",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08blow2-fwtm/08blow2-fwtm-threeByTwoSmallAt2X.jpg",
      //     author: "Charles M. Blow",
      //     url: "https://www.nytimes.com/2024/05/08/opinion/biden-young-voters-gaza.html",
      //     pub_date: "2024-05-09T00:13:30-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "The Oldest, Most Successful Party in Europe Is Headed for a Wipeout",
      //     content: "The Conservative Party is in crisis.",
      //     source: {
      //       id: "opinion",
      //       name: "opinion",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/09/opinion/09wheatcroft/09wheatcroft-threeByTwoSmallAt2X.jpg",
      //     author: "Geoffrey Wheatcroft",
      //     url: "https://www.nytimes.com/2024/05/09/opinion/britain-conservative-party-elections.html",
      //     pub_date: "2024-05-09T02:40:21-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "Why the Campus Protests Are So Troubling",
      //     content:
      //       "I don’t think the protests are antisemitic. But they undercut the only fair and just solution to the war.",
      //     source: {
      //       id: "opinion",
      //       name: "opinion",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/09/multimedia/08friedman-lqpw/08friedman-lqpw-threeByTwoSmallAt2X.jpg",
      //     author: "Thomas L. Friedman",
      //     url: "https://www.nytimes.com/2024/05/08/opinion/campus-protests-gaza.html",
      //     pub_date: "2024-05-09T00:13:18-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "The Tawdry Decade of Trump Could Desensitize Any Juror",
      //     content:
      //       "If everything is just a tabloid joke, can Trump be found guilty of a real crime?",
      //     source: {
      //       id: "opinion",
      //       name: "opinion",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/10/multimedia/08wegman1-jgcv/08wegman1-jgcv-threeByTwoSmallAt2X.jpg",
      //     author: "Jesse Wegman",
      //     url: "https://www.nytimes.com/2024/05/08/opinion/trump-trial-jurors.html",
      //     pub_date: "2024-05-09T01:26:45-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "Images of a Brazilian City Underwater",
      //     content:
      //       "Torrential rains have caused one of Brazil’s worst floods in modern history, leaving more than 100 dead and nearly an entire state submerged.",
      //     source: {
      //       id: "world",
      //       name: "world",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08Brazil-Floods-Photos-01-mgzv/08Brazil-Floods-Photos-01-mgzv-threeByTwoSmallAt2X.jpg",
      //     author: "Ana Ionova and Tanira Lebedeff",
      //     url: "https://www.nytimes.com/2024/05/08/world/americas/brazil-flooding-photos.html",
      //     pub_date: "2024-05-08T23:37:52-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "Fencing Rattled by Suspensions and Accusations Ahead of Olympics",
      //     content:
      //       "Concerns about refereeing integrity and preferential treatment for top saber competitors have cast a shadow over a sport decided by the finest of margins.",
      //     source: {
      //       id: "world",
      //       name: "world",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08olympics-fencing-tbkf/08olympics-fencing-tbkf-threeByTwoSmallAt2X.jpg",
      //     author: "Jeré Longman",
      //     url: "https://www.nytimes.com/2024/05/09/world/europe/fencing-olympics-turmoil.html",
      //     pub_date: "2024-05-09T02:40:38-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "Sony and Apollo’s Plan for Paramount: Break It Up",
      //     content:
      //       "CBS and other well-known properties would be sold if Sony and Apollo were able to buy Paramount. But the new owners would keep the movie studio.",
      //     source: {
      //       id: "business",
      //       name: "business",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08PARAMOUNT-SONY-1-wlzg/08PARAMOUNT-SONY-1-wlzg-threeByTwoSmallAt2X.jpg",
      //     author: "Benjamin Mullin and Lauren Hirsch",
      //     url: "https://www.nytimes.com/2024/05/08/business/media/sony-apollo-paramount-plan.html",
      //     pub_date: "2024-05-08T21:26:08-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title:
      //       "44-Foot Whale Found Dead on Bow of Cruise Ship Coming Into New York",
      //     content:
      //       "The endangered sei whale, usually found in deep waters, was discovered on the bow of a cruise ship as it arrived at the Brooklyn Cruise Terminal, marine authorities said.",
      //     source: {
      //       id: "us",
      //       name: "us",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/08/multimedia/08xp-whale-mtzg/08xp-whale-mtzg-threeByTwoSmallAt2X.jpg",
      //     author: "Livia Albeck-Ripka",
      //     url: "https://www.nytimes.com/2024/05/08/us/dead-whale-cruise-ship-port-brooklyn.html",
      //     pub_date: "2024-05-08T23:35:14-04:00",
      //   },
      //   {
      //     id: "1715239771067",
      //     title: "A Serene Oasis for Making Music",
      //     content:
      //       "Aaron Dessner’s Long Pond recording studio breaks a lot of design rules. It’s why musicians like Taylor Swift have put it on the map.",
      //     source: {
      //       id: "style",
      //       name: "style",
      //     },
      //     img: "https://static01.nyt.com/images/2024/05/12/multimedia/12sp-design-longpond1-cpkm/12sp-design-longpond1-cpkm-threeByTwoSmallAt2X.jpg",
      //     author: "Steven Kurutz and Jane Beiles",
      //     url: "https://www.nytimes.com/2024/05/08/style/long-pond-studio-hudson-valley.html",
      //     pub_date: "2024-05-08T18:16:07-04:00",
      //   },
      // ];

      combinedData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.pub_date) - new Date(a.pub_date);
      });

      return combinedData;
    } catch (error) {
      throw new Error("Failed to fetch news data");
    }
  }
);

const editorsPickSlice = createSlice({
  name: "editorsPick",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditorsPick.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditorsPick.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchEditorsPick.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectEditorsPick = (state) => state.editorsPick;

export default editorsPickSlice.reducer;
