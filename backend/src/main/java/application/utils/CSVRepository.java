package application.utils;

import com.opencsv.exceptions.CsvException;
import com.opencsv.exceptions.CsvValidationException;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Path;
import java.util.Arrays;

public class CSVRepository <T> {
    protected final Path basePath = Path.of("");
    protected Path fullPath;
    protected File file;
    protected Class<T> type;

    protected CSVRepository(String fileName, Class<T> type) {
        fullPath = Path.of("src\\main\\java\\application\\db\\documents\\" + fileName);
        file = new File(fullPath.toString());
        this.type = type;
    }

    /**
     * Convierte los datos de una clase (Documento) a 'formato' CSV
     * @param data Documento
     * @return {@link CSVRow}
     * @throws IllegalAccessException
     */
    protected CSVRow dataToCSV(T data) throws IllegalAccessException, IOException, CsvException {
        Field[] fields = type.getDeclaredFields();
        String[] header = new String[fields.length];
        String[] row = new String[fields.length];
        int index = 0;

        for (Field field : fields) {
            boolean fieldCanAccess = field.canAccess(data);
            header[index] = field.getName();
            field.setAccessible(true);
            Object value = field.get(data);

            if (value != null && value.getClass().isArray()) {
                value = String.valueOf(value);
            }

            row[index] = value != null ? (String) value : "NULL";
            field.setAccessible(fieldCanAccess);
            index++;
        }

        if (!file.exists()) {
            CSVDatabase.writeLine(new CSVRow(header), fullPath);
        }

        return new CSVRow(row);
    }

    /**
     * Convierte los datos en 'formato' CSV en una clase (Documento)
     * @param data Lista de datos CSV
     * @return Una lista de tipo {@link T}
     * @throws Exception
     */
    protected LinkedList<T> CSVtoData(LinkedList<CSVRow> data) throws Exception {
        Field[] fields = type.getDeclaredFields();
        CSVRow header = data.get(0);
        LinkedList<T> list = new LinkedList<T>();

        for (int i = 0; i < data.getSize(); i++) {
            CSVRow row = data.get(i);
            String[] cols = row.getCols();
            T instance = type.getDeclaredConstructor().newInstance();
            list.add(instance);

            for (Field field : fields) {
                int fieldHeaderCol = Arrays.asList(header.getCols()).indexOf(field);
                field.set(instance, cols[fieldHeaderCol]);
            }
        }

        return list;
    }

    /**
     * Guarda un documento en 'formato' CSV
     * @param data Documento
     * @throws IOException
     * @throws IllegalAccessException
     */
    public void save(T data) throws IOException, IllegalAccessException, CsvException {
        CSVRow row = dataToCSV(data);
        CSVDatabase.writeLine(row, fullPath);
    }

//    protected void saveAll(LinkedList<CSVRow> data, Path path) throws IOException {
//        CSVDatabase.writeAll(data, path);
//    }

    public LinkedList<CSVRow> getAll() throws CsvException, IOException {
        return CSVDatabase.read(fullPath);
    }
}
