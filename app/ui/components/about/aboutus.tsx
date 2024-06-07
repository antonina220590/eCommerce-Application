import clsx from 'clsx';
import style from '@/app/ui/components/about/aboutus.module.scss';
import Link from 'next/link';
import React from 'react';
import RSSIcon from '../../../../public/rs.svg';

export default function AboutUs() {
  return (
    <div className={clsx(style.aboutWrapper)}>
      <div className={clsx(style.aboutDescriptionWrapper)}>
        <div className={clsx(style.aboutTitleContainer)}>
          <h1 className={clsx(style.aboutTitle)}>About us</h1>
        </div>
        <div className={clsx(style.aboutTextContainer)}>
          <p className={clsx(style.aboutText)}>
            Our team of three - &apos;Xocink&apos;s Team&apos; was named after
            our mutual mentor. That is how we met each other in March 2024. And
            when we had to look for a team to complete the final task, we
            decided to team up and complete the final task together. Since the
            beginning of our joint work on this e-commetce project, we have been
            in touch daily. We share all the tasks at the beginning of the
            sprint and keep each other informed of our progress daily. This
            project gave us an opportunity to apply all the knowledges and
            skills acquired during the course. And moreover it gave us the
            priceless team work experience which is very important in real life.
          </p>
        </div>
      </div>
      <div className={style.rssLinkContainer}>
        <Link
          className={clsx(style.rssLink)}
          href="https://rs.school/"
          target="_blank"
        >
          <RSSIcon />
        </Link>
      </div>
      <div className={clsx(style.cardsContainer)}>
        <div className={clsx(style.cardsWrapper)}>
          <div className={clsx(style.pictureBox)}>
            <div className={clsx(style.pictureTonya)} />
          </div>
          <div className={clsx(style.cardsInfo)}>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>Name:</h4>
              <p className={clsx(style.p)}>Tonya</p>
            </span>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>GitHub:</h4>
              <Link
                href="https://github.com/antonina220590"
                className={clsx(style.gitHubLink)}
              >
                antonina220590
              </Link>
            </span>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>Job Title:</h4>
              <p className={clsx(style.p)}>Frontend Developer</p>
            </span>
            <span className={clsx(style.span)}>
              <p className={clsx(style.p)}>
                <span className={clsx(style.spanBio)}>Bio:</span> Tonya has a
                bachelor degree in law. She also spent one year in Italy
                studying the Internationl Tax law at the Ferrara University. The
                she worked as consultant in the field of corporate law in one of
                the Big4 companies for five years. Then she moved to another
                country and decided to try herself in frontend development as it
                was something completely new, interesting and challenging for
                her.
              </p>
            </span>
            <span className={clsx(style.span)}>
              <p className={clsx(style.p, style.para)}>
                <span className={clsx(style.spanBio)}>Contribution:</span> Tonya
                was the Team Lead of the Xocink&apos;s team. She organized the
                team&apos;s communication. She was working on the common design
                of the project, on the 404 page, on the detailed product page,
                on the categories and subcategories of the products, on this
                page. She also added the products to the commercetools.
              </p>
            </span>
          </div>
        </div>
        <div className={clsx(style.cardsWrapper)}>
          <div className={clsx(style.pictureBox)}>
            <div className={clsx(style.pictureGalya)} />
          </div>
          <div className={clsx(style.cardsInfo)}>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>Name:</h4>
              <p className={clsx(style.p)}>Galya</p>
            </span>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>GitHub:</h4>
              <Link
                href="https://github.com/gbogdanova"
                className={clsx(style.gitHubLink)}
              >
                gbogdanova
              </Link>
            </span>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>Job Title:</h4>
              <p className={clsx(style.p)}>Frontend Developer</p>
            </span>
            <span className={clsx(style.span)}>
              <p className={clsx(style.p)}>
                <span className={clsx(style.spanBio)}>Bio:</span> Galya is a
                budding frontend developer, eager to embrace new challenges and
                continuously improve her skills while collaborating with the
                team. Previously, she worked as a QA engineer, which honed her
                attention to detail and quality. Her transition into frontend
                development is driven by a passion for creating seamless,
                user-friendly interfaces and a commitment to leveraging her QA
                background to deliver high-quality solutions.
              </p>
            </span>
            <span className={clsx(style.span)}>
              <p className={clsx(style.p, style.para)}>
                <span className={clsx(style.spanBio)}>Contribution:</span> Galya
                is the irreplaceable member of our team. During the project she
                configured task boards for efficient project management,
                implemented client-side validation to ensure data integrity and
                developed a comprehensive catalog page. Moreover as a former QA
                engineer, she conducted the high-quality testing.
              </p>
            </span>
          </div>
        </div>
        <div className={clsx(style.cardsWrapper)}>
          <div className={clsx(style.pictureBox)}>
            <div className={clsx(style.pictureZhenya)} />
          </div>
          <div className={clsx(style.cardsInfo)}>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>Name:</h4>
              <p className={clsx(style.p)}>Zhenya</p>
            </span>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>GitHub:</h4>
              <Link
                href="https://github.com/yauhenbayeu"
                className={clsx(style.gitHubLink)}
              >
                yauhenbayeu
              </Link>
            </span>
            <span className={clsx(style.span)}>
              <h4 className={clsx(style.h4)}>Job Title:</h4>
              <p className={clsx(style.p)}>Frontend Developer</p>
            </span>
            <span className={clsx(style.span)}>
              <p className={clsx(style.p)}>
                <span className={clsx(style.spanBio)}>Bio:</span> Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </span>
            <span className={clsx(style.span)}>
              <p className={clsx(style.p, style.para)}>
                <span className={clsx(style.spanBio)}>Contribution:</span>Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
