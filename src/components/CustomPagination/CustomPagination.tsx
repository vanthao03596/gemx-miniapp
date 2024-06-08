import usePagination from '@/hooks/usePagination';
import { Button } from '@telegram-apps/telegram-ui';
import styles from './CustomPagination.module.scss';

interface CustomPaginationProps {
    handlePageChange: (page: number) => void;
    pageNumber: number;
    totalPages: number;
    siblingCount?: number;
}

const CustomPagination = (props: CustomPaginationProps) => {
    const { handlePageChange, totalPages, pageNumber, siblingCount = 1 } = props;
    const pageFiller = '…';
    const listPagination = usePagination({ pageNumber, totalPages, siblingCount, pageFiller });

    const handleClickPrevious = () => {
        if (pageNumber > 1) {
            handlePageChange(pageNumber - 1);
        }
    };

    const handleClickNext = () => {
        if (pageNumber < totalPages) {
            handlePageChange(pageNumber + 1);
        }
    };

    return (
        <div className={styles.container}>
            {/* Arrow left*/}
            <div className={styles.arrow} onClick={handleClickPrevious}>
                {/* <MaterialSymbolsArrowBackIosNewRounded /> */} Back
            </div>

            {/* Page number */}
            <div className={styles.numberContainer}>
                {listPagination?.map((item, index) => {
                    if (Number(item) === pageNumber)
                        return (
                            <Button key={index} mode='bezeled' onClick={() => handlePageChange(Number(item))}>
                                {item}
                            </Button>
                        );

                    return (
                        <Button key={index} mode='plain' onClick={() => handlePageChange(Number(item))}>
                            {item}
                        </Button>
                    );
                })}
            </div>

            {/* Arrow right*/}
            <div className={styles.arrow} onClick={handleClickNext}>
                {/* <MaterialSymbolsArrowForwardIosRounded /> */} Next
            </div>
        </div>
    );
};

export default CustomPagination;
