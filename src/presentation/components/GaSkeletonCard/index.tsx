import { CardContent, Stack, Skeleton, Card, Typography } from "@mui/material";

type Props = {};

const SkeletonCard = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={10} display="flex">
          <Skeleton animation="wave" width="100%">
            <CardContent />
          </Skeleton>
          <Skeleton animation="wave" width="40%">
            <Typography children="do" />
          </Skeleton>
        </Stack>
        <Stack direction="row" spacing={15} display="flex">
          <Skeleton width="30%">
            <Typography children="do" />
          </Skeleton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
