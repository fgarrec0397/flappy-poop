import { Vector3 } from "@react-three/fiber";
import { Avatar } from "antd";
import React, { FC } from "react";
import styled, { css } from "styled-components";
import Box from "./Box";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Search from "../Icons/Search";
import Typography, { TypographyStyles } from "./Typography";
import { dotBeforeStyles } from "../theme/mixins";
import baseTheme from "../theme/baseTheme";
import Link, { LinkStyles } from "./Link";
import OfficialAccount from "../Icons/OfficialAccount";
import Button, { ButtonStyles } from "./Button";
import { scaleZ } from "../constants";

interface Props {
  scale: Vector3;
  position: Vector3;
}

interface SuggestionsStyles {
  searchWrapper?: StyledWrapperProps;
  suggestionsWrapper?: StyledWrapperProps;
  suggestionsTitle?: TypographyStyles;
  newsWrapper?: StyledWrapperProps;
  newsItem?: StyledWrapperProps;
  newsCategoryWrapper?: StyledWrapperProps;
  newsCategory?: TypographyStyles;
  newsType?: TypographyStyles;
  newsTitle?: TypographyStyles;
  showMoreLink?: LinkStyles;
  followWrapper?: StyledWrapperProps;
  nameWrapper?: StyledWrapperProps;
  followName?: TypographyStyles;
  followUserName?: TypographyStyles;
  followButton?: ButtonStyles;
}

const styles: SuggestionsStyles = {
  searchWrapper: {
    css: css`
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.25em 1em;
      background-color: #eff3f4;
      border-radius: 2em;
    `,
  },
  suggestionsWrapper: {
    css: css`
      width: 100%;
      background-color: #f7f9f9;
      border-radius: 1em;
    `,
  },
  suggestionsTitle: {
    css: css`
      padding: 0.75rem 1rem 0.5rem;
      font-size: 20px;
      font-weight: bold;
      color: #0f1419;
    `,
  },
  newsItem: {
    css: css`
      padding: 0.75em 1em;
      cursor: pointer;

      &:hover {
        background-color: #ededed;
      }
    `,
  },
  newsCategoryWrapper: {
    css: css`
      display: flex;
      align-items: center;
    `,
  },
  newsCategory: {
    css: css`
      font-size: 13px;
      color: rgb(83, 100, 113);
    `,
  },
  newsType: {
    css: css`
      font-size: 13px;
      color: rgb(83, 100, 113);
      ${dotBeforeStyles()}
    `,
  },
  newsTitle: {
    css: css`
      display: block;
      margin: 4px 0;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.3;
    `,
  },
  showMoreLink: {
    css: css`
      color: ${baseTheme.colors.primary};
      font-size: 14px;
    `,
  },
  followWrapper: {
    css: css`
      display: flex;
      align-items: center;
      width: 100%;
    `,
  },
  nameWrapper: {
    css: css`
      display: flex;
      flex-direction: column;
      margin-left: 0.25em;
    `,
  },
  followName: {
    css: css`
      display: flex;
      font-size: 13px;
      font-weight: bold;

      svg {
        margin-left: 0.25em;
      }
    `,
  },
  followUserName: {
    css: css`
      font-size: 13px;
      color: ${baseTheme.colors.text.light};
    `,
  },
  followButton: {
    css: css`
      height: auto;
      padding: 5px 10px;
      margin-left: auto;
      line-height: 1;
      background-color: #0f1419;
      border-color: #0f1419;
    `,
  },
};

const SearchInput = styled.input`
  width: 85%;
  background-color: #eff3f4;
  border: none;

  &:focus-visible {
    outline: none;
  }
`;

const elementsWidthPx = 307;
const scaleX = 0.85;

const Suggestions: FC<Props> = ({ scale, position }) => {
  return (
    <group position={position}>
      <Box
        position={[0, 0, 0]}
        scale={[scaleX, 0.15, scaleZ]}
        heightPx={52}
        widthPx={elementsWidthPx}
        padding=".4em 1em"
        text="2 Hello motha fuck***"
      >
        <StyledWrapper {...styles.searchWrapper}>
          <Search />
          <SearchInput type="search" placeholder="Search Twitter" />
        </StyledWrapper>
      </Box>
      <Box
        position={[0, -(1.1 / 2 + 0.15 / 2 + 0.065), 0]}
        scale={[scaleX, 1.1, scaleZ]}
        heightPx={397}
        widthPx={elementsWidthPx}
        padding=".4em 1em"
        styles={{
          display: "flex",
          alignItems: "center",
        }}
        text="2 Hello motha fuck***"
      >
        <StyledWrapper {...styles.suggestionsWrapper}>
          <Typography as="h2" {...styles.suggestionsTitle}>
            What's happening
          </Typography>
          <StyledWrapper {...styles.newsWrapper}>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>NHL</Typography>
                <Typography {...styles.newsType}>Trending</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>Jack Campbell</Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>Video game</Typography>
                <Typography {...styles.newsType}>Trending</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>
                Animal Crossing: New Horizons 2.0 is out now
              </Typography>
              <Typography {...styles.newsCategory}>1.2k Tweets</Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>Television</Typography>
                <Typography {...styles.newsType}>21 minutes ago</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>
                Law & Order: Organized Crime airing on NBC
              </Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <Link to="/" {...styles.showMoreLink}>
                Show more
              </Link>
            </StyledWrapper>
          </StyledWrapper>
        </StyledWrapper>
      </Box>
      <Box
        position={[0, -(0.75 / 2 + 1.1 + 0.2), 0]} // fix this
        scale={[scaleX, 0.75, scaleZ]}
        heightPx={271}
        widthPx={elementsWidthPx}
        padding=".4em 1em"
        styles={{
          display: "flex",
          alignItems: "center",
        }}
        text="2 Hello motha fuck***"
      >
        <StyledWrapper {...styles.suggestionsWrapper}>
          <Typography as="h2" {...styles.suggestionsTitle}>
            Who to follow
          </Typography>
          <StyledWrapper {...styles.newsWrapper}>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <StyledWrapper {...styles.followWrapper}>
                  <Avatar src="https://picsum.photos/40?random=103" />
                  <StyledWrapper {...styles.nameWrapper}>
                    <Typography {...styles.followName}>
                      Unreal Engine
                      <OfficialAccount />
                    </Typography>
                    <Typography {...styles.followUserName}>
                      @UnrealEngine
                    </Typography>
                  </StyledWrapper>
                  <Button type="primary" {...styles.followButton}>
                    Follow
                  </Button>
                </StyledWrapper>
              </StyledWrapper>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <StyledWrapper {...styles.followWrapper}>
                  <Avatar src="https://picsum.photos/40?random=102" />
                  <StyledWrapper {...styles.nameWrapper}>
                    <Typography {...styles.followName}>
                      Fortnite
                      <OfficialAccount />
                    </Typography>
                    <Typography {...styles.followUserName}>
                      @Fortnite
                    </Typography>
                  </StyledWrapper>
                  <Button type="primary" {...styles.followButton}>
                    Follow
                  </Button>
                </StyledWrapper>
              </StyledWrapper>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <Link to="/" {...styles.showMoreLink}>
                Show more
              </Link>
            </StyledWrapper>
          </StyledWrapper>
        </StyledWrapper>
      </Box>
    </group>
  );
};

export default Suggestions;
