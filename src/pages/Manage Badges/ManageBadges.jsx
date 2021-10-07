/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/Typography/Heading";
import ManageBadgesForm from "./ManageBadgesForm";
import { mq, theme } from "../../constants/theme";
import BaseButton from "../../components/Button/BaseButton";
import BadgeDetailsModal from "./BadgeDetailsModal";
import CreateFormModal from "./CreateFormModal";
import AssignBadgeModal from "./AssignBadgeModal";
import CongratulationsModal from "./CongratulationsModal";
const { white, darkerGray, royalBlue } = theme.colors;
const { display } = theme.typography.font.family;

const CreateBadgeContainer = styled.div`
	width: 95%;
	max-width: 800px;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: ${darkerGray};
	background-color: ${white};
	letter-spacing: normal;
	font-style: normal;
	font-stretch: normal;
	margin-bottom: 104px;
	h1 {
		font-family: ${display.poppins};
		font-size: 32px;
		font-style: normal;
		font-weight: 700;
		line-height: 48px;
		letter-spacing: 0em;
		text-align: left;
		margin 1em 0;
		/* Color/Primary Text */
		color: #282828;
		@media screen and (max-width: ${mq.phone.wide.maxWidth}) {
			font-size: 2.6rem;
			line-height: 2.8rem;
		}
	}
;
`;

const FormContainer = styled.div`
	position: relative;
	margin-bottom: 104px;
	border: 1px solid #c4c4c4;
	#create-badge-form {
		align-content: top;
		justify-content: center;
		margin: 3vh 2.5vw;
		margin-bottom: 0.25vh;
	}
	.ant-modal-body {
		text-align: left;
	}
	.ant-btn {
		position: relative;
		background-color: white;
		color: ${royalBlue};
	}
	p {
		font-family: ${display.worksans};
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: center;
	}
	.ant-btn-primary {
		border-radius: 46px;
		background-color: ${royalBlue};
		color: white;
		align-items: right;
	}
	.ant-btn-secondary {
		border-radius: 46px;
		background-color: ${white};
		color: ${royalBlue};
		border: 1px solid ${royalBlue};
		height: 44px;
		width: 200px;
		left: 0px;
		top: 0px;
		font-weight: 500;
	}
  .badge-thumbnail {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
  .badge-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;

const StyledBadge = styled.div`
width: min-content;
padding: 20px;
display: inline-block;
span {
padding: 3px;
}
`;

function ManageBadges() {
  const [badgeDetailsModal, setBadgeDetailsModal] = useState(false);
  const [createMoreModal, setCreateMoreModal] = useState(false);
  const [isCongratulationsModalShowing, setCongratulationsModal] = useState(false);
  const [assignBadgeModal, setAssignBadgeModal] = useState(false);
  const [currentBadge, setCurrentBadge] = useState({});

  const renderTags = (tags) => {
    return tags
      ? tags.map(tag => <span key="tag-id"> {tag} </span>)
      : null;
  };

  const clickHandler = (badge) => {
    setCurrentBadge(badge);
    setBadgeDetailsModal(true);
  };

  return (
    <div>
      <CreateBadgeContainer>
        <Heading>Manage Badges</Heading>
        <FormContainer>
          <ManageBadgesForm />
          <div className="badge-container"></div>
          <BadgeDetailsModal
            isShowing={badgeDetailsModal}
            hide={() => setBadgeDetailsModal(false)}
            title="Badge Details"
            keyboard={true}
            secondaryButtonStyle="true"
            modalBodyText={
              <div className="modal-form-body">
                <img className="badge-modal-thumbnail" src={currentBadge.src} />
                <span>Name: {currentBadge.name}</span>
                <span>Description: {currentBadge.description}</span>
                <span>Tags: {renderTags(currentBadge.tags)}</span>
                <span>Remaining Quantity: xxx/</span>
              </div>}
            footer={
              <div className="btn-container">
                <BaseButton
                  className="btn-secondary" key="back"
                  onClick={() => {
                    setBadgeDetailsModal(false);
                    setAssignBadgeModal(true);
                  }}>
                Assign Badge
                </BaseButton>
                <BaseButton
                  className="btn-primary"
                  type="primary"
                  key="submit"
                  onClick={() => { setBadgeDetailsModal(false); setCreateMoreModal(true); }}>
                Create More
                </BaseButton>
              </div>
            }>
          </BadgeDetailsModal>
          <CreateFormModal
            isCreateMoreModal={createMoreModal}
            hide={() => setCreateMoreModal(false)}
            openCongratulationsModal={() => setCongratulationsModal(true)}
            title="Create More Badges"
            buttonPrimary="Create More"
            buttonSecondary="Cancel"
            modalBodyText="true"
            name="name"
            description="description"
            tags="tags"
            quantity="quantity"
            currentBadge={currentBadge}/>
          <CongratulationsModal
            isCongratulationsModalShowing={isCongratulationsModalShowing}
            hide={() => setCongratulationsModal(false)}
            buttonPrimary="Assign Badge"
            buttonSecondary="Cancel"
            modalBodyText="true"
            title="Congratulations You created xx new badges!"
            currentBadge={currentBadge}
          />
          <AssignBadgeModal
            assignBadgeModal={assignBadgeModal}
            hide={() => setAssignBadgeModal(false)}
            title="Assign a Badge"
          />

        </FormContainer>
      </CreateBadgeContainer>
    </div>
  );
}

export default ManageBadges;
