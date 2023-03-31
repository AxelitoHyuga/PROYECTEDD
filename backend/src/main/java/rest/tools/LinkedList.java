package rest.tools;

import org.springframework.data.annotation.ReadOnlyProperty;

public class LinkedList <E> {
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
     * Inserta un elemento en la ultima posición de la lista
     * @param item Elemento que se insertara a la lista
     */
    public void add(E item) {
        Node<E> newNode = new Node<>(last, item, null);

        if (first == null) {
            first = newNode;
            last = newNode;
        } else {
            last.next = newNode;
            last = newNode;
        }
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
                newNode.next = first;
                first.prev = newNode;
                first = newNode;
            } else {
                Node<E> temp = first;
                int pos = 0;

                /* Recorre los nodos en la lista hasta llegar
                    a la posición donde se insertara el nuevo nodo.
                    Temp sera igual al nodo ya existente en la posición deseada */
                while (pos < index) {
                    temp = temp.next;
                    pos++;
                }

                /* Reconecta:
                    -> El nodo siguiente de "newNode" con "temp"
                    -> El nodo previo de "newNode" con el nodo "temp.prev"
                    -> El nodo siguiente del nodo "temp.prev" con "newNode"
                    -> El nodo "temp.prev" con "newNode" */
                newNode.next = temp;
                newNode.prev = temp.prev;
                temp.prev.next = newNode;
                temp.prev = newNode;
            }

        } else {
            throw new Exception(String.format("La posición ingresada (%s) no es una posición de insercción valida !!", index));
        }

    }
}

class Node <E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}