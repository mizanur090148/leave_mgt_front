import { useCallback, useState } from "react";
import { Container, Row } from "reactstrap";
import { themifyIconData } from "../../../Data/Icons/ThemifyIcon";
import IconMarkUp from "../IconMarkUp";
import ThemifyIconCard from "./ThemifyIconCard";

const ThemifyIconsContainer = () => {
  const [iTag, setITag] = useState<string | object>("");
  const [icon, setIcon] = useState<string | object>("");

  const callback = useCallback((tag: string) => {
    setITag({
      iTag: '<i className="' + tag + '"></i>',
    });
    setIcon({
      icon: "" + tag + " fa-2x",
    });
  }, []);
  return (
    <>
      <Container fluid>
        {themifyIconData.map((item: any, i: number) => {
          return (
            <Row key={i}>
              <ThemifyIconCard
                iconType={item.data}
                title={item.title}
                parentCallback={callback}
              />
            </Row>
          );
        })}
      </Container>
      <IconMarkUp itag={iTag} icons={icon} />
    </>
  );
};

export default ThemifyIconsContainer;
