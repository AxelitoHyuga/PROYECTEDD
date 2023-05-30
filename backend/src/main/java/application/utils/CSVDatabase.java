package application.utils;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.ICSVWriter;
import com.opencsv.exceptions.CsvException;
import com.opencsv.exceptions.CsvValidationException;

import java.io.*;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.StringTokenizer;

public class CSVDatabase {

    public static void writeLine(CSVRow data, Path path) throws IOException, CsvException {
        LinkedList<CSVRow> rows = read(path);
        ICSVWriter writer = new CSVWriterBuilder(new FileWriter(path.toAbsolutePath().toString())).build();

        for (CSVRow row : rows) {
            writer.writeNext(row.getCols());
        }

        writer.writeNext(data.getCols());
        writer.close();
    }

    public static void writeAll(LinkedList<CSVRow> data, Path path) throws IOException {
        FileWriter fileWriter = new FileWriter(path.toString());
        ICSVWriter writer = new CSVWriterBuilder(fileWriter).build();

        for (CSVRow row : data) {
            writer.writeNext(row.getCols());
        }

        writer.close();
    }

    public static LinkedList<CSVRow> read(Path path) throws IOException, CsvException {
        File file = new File(path.toAbsolutePath().toString());

        if (!file.exists()) {
            return new LinkedList<>();
        }

        FileReader fileReader = new FileReader(path.toAbsolutePath().toString());
        CSVReader reader = new CSVReaderBuilder(fileReader).build();
        LinkedList<CSVRow> rows = new LinkedList<>();
        String[] nextLine;

        while ((nextLine = reader.readNext()) != null) {
            CSVRow row = new CSVRow(nextLine);
            rows.add(row);
        }

        return rows;
    }

}
