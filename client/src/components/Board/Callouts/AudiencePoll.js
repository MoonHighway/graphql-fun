import React from "react";
import Gauge from "./Gauge";
import styled from "styled-components";

const totalVote = ({ yes, no }) => yes + no;

const byHowMuch = (leader, { yes, no }) =>
  leader === "yes" ? yes - no : leader === "no" ? no - yes : 0;

const convertToGaugeValue = (leader, by) =>
  leader === "yes" ? by * 50 + 50 : 50 - by * 50;

const getGaugeValue = results =>
  convertToGaugeValue(
    getLeader(results),
    byHowMuch(getLeader(results), results) / totalVote(results)
  );

const getLeader = ({ yes, no }) => {
  if (yes === 0 && no > 0) return "no";
  if (no === 0 && yes > 0) return "yes";
  return yes - no < 0 ? "yes" : yes - no > 0 ? "no" : " ";
};

export function AudiencePoll({ results, theme }) {
  let gaugeValue = getGaugeValue(results);
  if (isNaN(gaugeValue)) gaugeValue = 50;
  return (
    <Container>
      <Gauge
        value={gaugeValue}
        width={window.innerWidth - 0.25 * window.innerWidth}
        height={window.innerHeight - 0.15 * window.innerHeight}
        color="#E9D24D"
        backgroundColor="#E535AB"
        label={results.question}
        fill={getLeader(results) === "no" ? "#E535AB" : "#E9D24D"}
        leftValue={results.yesLabel || "yes"}
        rightValue={results.noLabel || "no"}
        centerValue=" "
      />
    </Container>
  );
}

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
