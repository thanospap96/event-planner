import { Router } from 'express';
import { authenticate} from "../middleware/authMiddleware";
import { validate} from "../middleware/validate";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
} from "../controllers/eventController";
import {
    createEventSchema,
    updateEventSchema,
    idParamSchema,
} from "../validation/eventSchemas";
import { loadEvent, requireOwnerOrAdmin} from "../middleware/eventOwnership";

const router = Router();

/**
 * @openapi
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Events list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventResponse'
 *       401:
 *         description: Invalid or missing token
 */
router.get("/", authenticate, getEvents);

/**
 * @openapi
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventRequest'
 *     responses:
 *       201:
 *         description: Event created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid or missing token
 */
router.post("/", authenticate, validate(createEventSchema), createEvent);

/**
 * @openapi
 * /api/events/{id}:
 *   get:
 *     summary: Get event by id
 *     tags: [Events]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       404:
 *         description: Event not found
 */

router.get("/:id", authenticate, validate(idParamSchema),getEventById);

/**
 * @openapi
 * /api/events/{id}:
 *   put:
 *     summary: Update event (owner or admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventUpdateRequest'
 *     responses:
 *       200:
 *         description: Event updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Only owner or admin can update
 *       404:
 *         description: Event not found
 */
router.put("/:id", authenticate, validate(updateEventSchema), loadEvent, requireOwnerOrAdmin, updateEvent);


/**
 * @openapi
 * /api/events/{id}:
 *   delete:
 *     summary: Delete event (owner or admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Only owner or admin can delete
 *       404:
 *         description: Event not found
 */

router.delete("/:id", authenticate, validate(idParamSchema), loadEvent, requireOwnerOrAdmin, deleteEvent);

/**
 * @openapi
 * /api/events/{id}/join:
 *   post:
 *     summary: Join an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Joined event successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Event not found
 */
router.post("/:id/join", authenticate, validate(idParamSchema), joinEvent);

/**
 * @openapi
 * /api/events/{id}/leave:
 *   post:
 *     summary: Leave an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Left event successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Event not found
 */
router.post("/:id/leave", authenticate, validate(idParamSchema), leaveEvent);

export default router;
