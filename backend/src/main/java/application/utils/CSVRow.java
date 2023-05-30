package application.utils;

public class CSVRow {
    private String[] cols;
    private boolean isHeader;

    public CSVRow(String[] cols) {
        this.cols = cols;
    }

    public CSVRow(String[] cols, boolean isHeader) {
        this.cols = cols;
        this.isHeader = isHeader;
    }

    public String[] getCols() {
        return cols;
    }

    public boolean isHeader() {
        return isHeader;
    }
}
