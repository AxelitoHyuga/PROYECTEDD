package application.utils;

import java.util.Comparator;
import java.util.Iterator;

public class LinkedList <E> implements Iterable<E> {
    /**
     * Apunta al primer nodo de la lista
     */
    private Node<E> first;
    /**
     * Apunta al ultimo nodo de la lista
     */
    private Node<E> last;
    /**
     * Indica el tamaño de la lista
     */
    private int size = 0;

    /**
     * Construye una lista vacia
     */
    public LinkedList() {}

    /**
     * Inserta un elemento en la última posición de la lista
     * @param item Elemento que se insertara a la lista
     */
    public void add(E item) {
        Node<E> newNode = new Node<>(last, item, null);

        if (first == null) {
            first = newNode;
            last = newNode;
        } else {
            last.setNext(newNode);
            last = newNode;
        }

        size++;
    }

    /**
     * Inserta un elemento en la posición pasada como argumento
     * @param index La posición en la que sera insertado el elemento
     * @param item Elemento que se insertara a la lista
     * @throws Exception
     */
    public void add(int index, E item) throws Exception {

        if ((index >= 0) && (index < size)) {
            Node<E> newNode = new Node<>(null, item, null);

            if (index == 0) {
                newNode.setNext(first);
                first.setPrev(newNode);
                first = newNode;
            } else {
                Node<E> temp = first;
                int pos = 0;

                /* Recorre los nodos en la lista hasta llegar
                    a la posición donde se insertara el nuevo nodo.
                    Temp será igual al nodo ya existente en la posición deseada */
                while (pos < index) {
                    temp = temp.getNext();
                    pos++;
                }

                /* Reconecta:
                    -> El nodo siguiente de "newNode" con "temp"
                    -> El nodo previo de "newNode" con el nodo "temp.prev"
                    -> El nodo siguiente del nodo "temp.prev" con "newNode"
                    -> El nodo "temp.prev" con "newNode" */
                newNode.setNext(temp);
                newNode.setPrev(temp.getPrev());
                temp.getPrev().setNext(newNode);
                temp.setPrev(newNode);
            }

            size++;
        } else {
            throw new Exception(String.format("La posición ingresada (%s) no es una posición de insercción valida !!", index));
        }

    }

    /**
     * Busca un nodo en una posición
     * @param pos Posición
     * @return El nodo en la posición
     * @throws Exception
     */
    public E get(int pos) throws Exception {
        /* Validar posición */
        if ((pos >= 0) && (pos < size)) {
            /* Se recorren los nodos hasta el nodo de la posición deseada */
            Node<E> temp = first;
            int nodesPos = 0;

            while (nodesPos < pos) {
                temp = temp.getNext();
                nodesPos++;
            }

            return temp.getItem();
        } else {
            throw new Exception(String.format("La posición ingresada no es una posición valida !!"));
        }
    }

    public int getSize() {
        return size;
    }

    public void sort(Comparator<E> comparator) {
        Node<E> curr = first;

        while (curr != null) {
            Node<E> min = curr;
            Node<E> next = curr.getNext();

            while (next != null) {
                if (comparator.compare(next.getItem(), min.getItem()) < 0) {
                    min = next;
                }
                next = next.getNext();
            }

            // Intercambiar valores
            E temp = curr.getItem();
            curr.setItem(min.getItem());
            min.setItem(temp);

            curr = curr.getNext();
        }
    }

    public E binarySearch(E value, Comparator<E> comparator) throws Exception {
        int pos = binarySearchRec(value, 0, size - 1, comparator);

        if (pos == -1) {
            return null;
        }

        return get(pos);
    }

    private int binarySearchRec(E value, int ini, int fin, Comparator<E> comparator) throws Exception {
        if (ini > fin) {
            return -1;
        }

        int medio = ini + (fin - ini) / 2;
        E valorMedio = get(medio);

        if (comparator.compare(valorMedio, value) == 0) {
            return medio;  // El valor objetivo se encontró en la posición "medio"
        } else if (comparator.compare(valorMedio, value) < 0) {
            return binarySearchRec(value, medio + 1, fin, comparator);  // El valor objetivo es mayor, buscar en la mitad derecha
        } else {
            return binarySearchRec(value, ini, medio - 1, comparator);  // El valor objetivo es menor, buscar en la mitad izquierda
        }
    }

    public Iterator<E> iterator() {
        return new Iterator<E>() {
            public int currentIndex = 0;
            @Override
            public boolean hasNext() {
                return currentIndex < size;
            }

            @Override
            public E next() {
                E element = null;
                try {
                    element = get(currentIndex);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
                currentIndex++;
                return element;
            }
        };
    }

    public String toJsonString() {
        String result = "[";
        Iterator<E> items = this.iterator();

        while(items.hasNext()) {
            result += items.next().toString();
            if(items.hasNext()) {
                result += ",";
            }
        }
        
        result += "]";
        

        return result;
    }
}

class Node <E> {
    private E item;
    private Node<E> next;
    private Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }

    public E getItem() {
        return item;
    }

    public void setItem(E item) {
        this.item = item;
    }

    public Node<E> getNext() {
        return next;
    }

    public void setNext(Node<E> next) {
        this.next = next;
    }

    public Node<E> getPrev() {
        return prev;
    }

    public void setPrev(Node<E> prev) {
        this.prev = prev;
    }

}