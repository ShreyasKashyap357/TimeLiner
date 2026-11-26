// Migration (applied 2026-11-26), user decision D-14: a "Recommended for new viewers" order for the MCU,
// collated from six published guides (researched 2026-11-26). Method: release order as the backbone (no
// reordering had support from two or more sources); a unit is essential when at least two of the five selective
// lists recommend it, otherwise optional. SuperHeroHype lists nearly everything, so it does not count toward the
// threshold. Unreleased units are left out. Idempotent: replaces the order with the same id.
import { readFile, writeFile } from 'node:fs/promises';
import { ContinuitiesFile, type AltOrder } from '../../src/domain/schema.ts';

const FILE = 'data/marvel/continuities.json';
const SOURCES: AltOrder['sources'] = [
  {
    "url": "https://www.thepopverse.com/marvel-movies-in-order-mcu-cinematic-universe-studios-chronological-release",
    "title": "Marvel Movies in Order: The Complete MCU Watch Order - Updated! (Release & Chronological, 2008–2026)",
    "date": "2026-04-06"
  },
  {
    "url": "https://www.superherohype.com/guides/614990-best-mcu-viewing-order-whats-the-best-order-to-watch-marvel-movies-tv-shows",
    "title": "Our MCU Watch Guide Helps You Tackle the Massive Franchise the Right Way",
    "date": "2026-06-15"
  },
  {
    "url": "https://guides.justwatch.com/us/mcu-movie-viewing-paths-explained",
    "title": "Where Should You Start With The Marvel Movies? 5 Viewing Paths, Explained",
    "date": "2026-03-17"
  },
  {
    "url": "https://screenrant.com/avengers-doomsday-marvel-movies-shows-watch-list-disney-plus-confirms/",
    "title": "Disney+ Confirms 15 Essential Marvel Movies & Shows To Watch Before Avengers: Doomsday",
    "date": "2026-08-16"
  },
  {
    "url": "https://editorial.rottentomatoes.com/guide/essential-marvel-movies-guide/",
    "title": "The Essential Marvel Movies to Watch Before Avengers: Doomsday",
    "date": "2026-11-13"
  },
  {
    "url": "https://screenrant.com/mcu-movies-shows-watch-before-avengers-doomsday/",
    "title": "Avengers: Doomsday's Ultimate Viewing Guide: Every MCU Movie & Show You Need To Watch",
    "date": "2026-05-03"
  }
];
const UNIT_IDS: string[] = ["iron-man","the-incredible-hulk","iron-man-2","thor","captain-america-the-first-avenger","the-consultant","a-funny-thing-happened-on-the-way-to-thors-hammer","the-avengers","item-47","iron-man-3","agent-carter-one-shot","agents-of-shield-s1","thor-the-dark-world","all-hail-the-king","captain-america-the-winter-soldier","guardians-of-the-galaxy","agents-of-shield-s2","agent-carter-series-s1","daredevil-s1","avengers-age-of-ultron","ant-man","agents-of-shield-s3","jessica-jones-s1","agent-carter-series-s2","daredevil-s2","captain-america-civil-war","agents-of-shield-s4","luke-cage-s1","doctor-strange","agents-of-shield-slingshot-series","iron-fist-s1","guardians-of-the-galaxy-vol-2","spider-man-homecoming","the-defenders-s1","inhumans-s1","thor-ragnarok","the-punisher-s1","runaways-s1","agents-of-shield-s5","black-panther","jessica-jones-s2","avengers-infinity-war","cloak-and-dagger-s1","luke-cage-s2","ant-man-and-the-wasp","iron-fist-s2","daredevil-s3","runaways-s2","the-punisher-s2","captain-marvel","cloak-and-dagger-s2","avengers-endgame","agents-of-shield-s6","jessica-jones-s3","spider-man-far-from-home","runaways-s3","agents-of-shield-s7","helstrom-s1","wandavision-s1","the-falcon-and-the-winter-soldier-s1","loki-s1","black-widow","what-if-s1","shang-chi-and-the-legend-of-the-ten-rings","eternals","hawkeye-s1","spider-man-no-way-home","moon-knight-s1","doctor-strange-in-the-multiverse-of-madness","ms-marvel-s1","thor-love-and-thunder","i-am-groot-ep1","i-am-groot-ep2-10","she-hulk-attorney-at-law-s1","werewolf-by-night","black-panther-wakanda-forever","the-guardians-of-the-galaxy-holiday-special","ant-man-and-the-wasp-quantumania","guardians-of-the-galaxy-vol-3","secret-invasion-s1","loki-s2","the-marvels","what-if-s2","echo-s1","deadpool-and-wolverine","agatha-all-along-s1","what-if-s3","your-friendly-neighborhood-spider-man-s1","captain-america-brave-new-world","daredevil-born-again-s1-e1","daredevil-born-again-s1-e2-9","thunderbolts","ironheart-s1","the-fantastic-four-first-steps","eyes-of-wakanda-ep1","eyes-of-wakanda-ep2","eyes-of-wakanda-ep3","eyes-of-wakanda-ep4","marvel-zombies-s1","wonder-man-s1","daredevil-born-again-s2","the-punisher-one-last-kill","spider-man-brand-new-day","visionquest-s1"];
const OPTIONAL: string[] = ["the-incredible-hulk","iron-man-2","the-consultant","a-funny-thing-happened-on-the-way-to-thors-hammer","item-47","iron-man-3","agent-carter-one-shot","agents-of-shield-s1","thor-the-dark-world","all-hail-the-king","agents-of-shield-s2","agent-carter-series-s1","daredevil-s1","avengers-age-of-ultron","ant-man","agents-of-shield-s3","jessica-jones-s1","agent-carter-series-s2","daredevil-s2","agents-of-shield-s4","luke-cage-s1","doctor-strange","agents-of-shield-slingshot-series","iron-fist-s1","guardians-of-the-galaxy-vol-2","spider-man-homecoming","the-defenders-s1","inhumans-s1","thor-ragnarok","the-punisher-s1","runaways-s1","agents-of-shield-s5","black-panther","jessica-jones-s2","cloak-and-dagger-s1","luke-cage-s2","ant-man-and-the-wasp","iron-fist-s2","daredevil-s3","runaways-s2","the-punisher-s2","captain-marvel","cloak-and-dagger-s2","agents-of-shield-s6","jessica-jones-s3","spider-man-far-from-home","runaways-s3","agents-of-shield-s7","helstrom-s1","wandavision-s1","the-falcon-and-the-winter-soldier-s1","what-if-s1","eternals","hawkeye-s1","moon-knight-s1","ms-marvel-s1","i-am-groot-ep1","i-am-groot-ep2-10","she-hulk-attorney-at-law-s1","werewolf-by-night","the-guardians-of-the-galaxy-holiday-special","secret-invasion-s1","the-marvels","what-if-s2","echo-s1","agatha-all-along-s1","what-if-s3","your-friendly-neighborhood-spider-man-s1","daredevil-born-again-s1-e1","daredevil-born-again-s1-e2-9","ironheart-s1","eyes-of-wakanda-ep1","eyes-of-wakanda-ep2","eyes-of-wakanda-ep3","eyes-of-wakanda-ep4","marvel-zombies-s1","wonder-man-s1","daredevil-born-again-s2","the-punisher-one-last-kill","spider-man-brand-new-day","visionquest-s1"];

const ORDER: AltOrder = {
  id: 'recommended', label: 'Recommended for new viewers', kind: 'recommended', source_url: SOURCES[0]!.url, as_of: '2026-11-26',
  note: 'Release order (no reordering had support from two or more guides). Entries at least two of the selective guides recommend are essentials; the rest are marked optional. Unreleased titles are not included.',
  unit_ids: UNIT_IDS, optional_unit_ids: OPTIONAL, sources: SOURCES,
};

const conts = ContinuitiesFile.parse(JSON.parse(await readFile(FILE, 'utf8')));
const mcu = conts.find((c) => c.id === 'mcu')!;
mcu.alt_orders = [...mcu.alt_orders.filter((a) => a.id !== ORDER.id), ORDER];
await writeFile(FILE, JSON.stringify(conts, null, 2) + '\n');
console.log(`recommended order: ${UNIT_IDS.length} units, ${OPTIONAL.length} optional`);
